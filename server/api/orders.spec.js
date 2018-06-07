const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { User, Product, Order } = require('../db/models')

describe('Orders routes', () => {
  describe('/api/orders without logging in', () => {
    it('GET /api/orders receives a 401', () => {
      return request(app)
        .get('/api/orders')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })

  describe('/api/orders with authorization', () => {
    const authRequest = request.agent(app)
    const productToCreate = {
      name: 'Kit-Kat',
      description: 'Oat cake soufflé powder carrot cake gummi bears.',
      price: 2.50,
      inventory: 100
    }
    const userOneOrder = {
      status: 'Created',
      subtotal: 5.00,
      shippingAddress: '123 Main St., Chicago, IL 60601',
      userId: 1
    }
    const userTwoOrder = {
      status: 'Created',
      subtotal: 4.00,
      shippingAddress: '123 Main St., Chicago, IL 60601',
      userId: 2
    }
    const userData = {email: 'user@test.com', password: 'test', isAdmin: false}
    const adminData = {email: 'user2@test.com', password: 'test', isAdmin: true}

    beforeEach(async () => {
      await User.bulkCreate([userData, adminData], {individualHooks: true})
      const [product, orders] = await Promise.all([Product.create(productToCreate), Order.bulkCreate([userOneOrder, userTwoOrder])])

      let syncedOrders = await Order.findAll()
      await Promise.all(syncedOrders.map(order => order.addProduct(product, { through: {
        priceAtTime: product.price,
        quantity: 2,
      }})))
    })

    describe('as a logged in user', () => {
      beforeEach(async () => {
        await authRequest
        .post('/auth/login')
        .send(userData)
      })

      it('GET /api/orders returns only their orders from the DB', () => {
        return authRequest
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.equal(1)
            expect(res.body[0].userId).to.equal(1)
          })
      })

      it('GET /api/orders returns orders with products eager loaded', () => {
        return authRequest
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].products).to.be.an('array')
            expect(res.body[0].products[0].name).to.equal('Kit-Kat')
          })
      })

      it('GET /api/orders returns the prices of products at the time of the order', async () => {
        await Product.update({price: 1.99}, {
          where: {
            id: 1,
          },
        })
        return authRequest
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body[0].products[0].order_products.priceAtTime).to.equal(2.50)
          })
      })
    })

    describe('as a logged in admin', () => {
      beforeEach(async () => {
        await authRequest
        .post('/auth/login')
        .send(adminData)
      })

      it('GET /api/orders returns ALL orders from the DB', () => {
        return authRequest
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.equal(2)
          })
      })
    })
  })
})
