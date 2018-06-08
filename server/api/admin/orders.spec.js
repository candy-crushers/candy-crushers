const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const { User, Product, Order } = require('../../db/models')

describe('Orders Admin routes', () => {
  describe('/api/admin/orders without logging in', () => {
    it('GET /api/admin/orders receives a 401', () => {
      return request(app)
        .get('/api/admin/orders')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })

    it('GET /api/orders/:id receives a 401', () => {
      return request(app)
        .get('/api/admin/orders/1')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })

  describe('/api/admin/orders as an admin', () => {
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
        .send(adminData)
    })

    it('GET /api/admin/orders returns ALL orders from the DB', () => {
      return authRequest
        .get('/api/admin/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(2)
        })
    })

    it('GET /api/admin/orders/:id returns a single order from the DB', () => {
      return authRequest
        .get('/api/admin/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.equal(1)
        })
    })

    it('GET /api/admin/orders/:id returns a 404 if the order doesn`t exist', () => {
      return authRequest
        .get('/api/admin/orders/100')
        .expect(404)
    })
  })
})

