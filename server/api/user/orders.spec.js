const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const { User, Product, Order } = require('../../db/models')

describe('Orders User routes', () => {
  describe('without logging in', () => {
    it('GET /api/user/orders receives a 401', () => {
      return request(app)
        .get('/api/user/orders')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })

    it('GET /api/user/orders/:id', () => {
      return request(app)
        .get('/api/user/orders/1')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })

  describe('with logged in user', () => {
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
      await User.create(userData)
      await User.create(adminData)
      const [product, orders] = await Promise.all([Product.create(productToCreate), Order.bulkCreate([userOneOrder, userTwoOrder])])

      let syncedOrders = await Order.findAll()
      await Promise.all(syncedOrders.map(order => order.addProduct(product, { through: {
        priceAtTime: product.price,
        quantity: 2,
      }})))

      await authRequest
        .post('/auth/login')
        .send(userData)
    })

    describe('GET /api/user/orders', () => {
      it('returns only their orders from the DB', () => {
        return authRequest
          .get('/api/user/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.equal(1)
            expect(res.body[0].userId).to.equal(1)
          })
      })

      it('returns orders with products eager loaded', () => {
        return authRequest
          .get('/api/user/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].products).to.be.an('array')
            expect(res.body[0].products[0].name).to.equal('Kit-Kat')
          })
      })

      it('returns the prices of products at the time of the order', async () => {
        await Product.update({price: 1.99}, {
          where: {
            id: 1,
          },
        })
        return authRequest
          .get('/api/user/orders')
          .expect(200)
          .then(res => {
            expect(res.body[0].products[0].order_products.priceAtTime).to.equal(2.50)
          })
      })
    })

    describe('GET /api/user/orders/:id', () => {
      it('returns the single order from the DB', () => {
        return authRequest
          .get('/api/user/orders/1')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.userId).to.equal(1)
          })
      })

      it('will return a 404 if the order doesn\'t belong to them', () => {
        return authRequest
          .get('/api/user/orders/2')
          .expect(404)
      })
    })
  })
})
