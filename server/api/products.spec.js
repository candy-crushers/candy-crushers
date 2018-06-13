const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const { Product, User } = require('../db/models')

describe('Visitor Product routes', () => {
  describe('/api/products without authorization', () => {
    it('GET /api/products returns products from the DB', () => {
      const newProduct = {
        name: 'twix',
        description: 'caramel heaven',
        inventory: 50,
        price: 1.49
      }

      Product.create(newProduct)

      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(newProduct.name);
          expect(res.body[0].description).to.be.equal(newProduct.description);
          expect(res.body[0].inventory).to.be.equal(newProduct.inventory);
          expect(res.body[0].price).to.be.equal(149);
        })
      })

    it('POST /api/admin/products as an unauthorized user receives a 401', () => {
      const productToCreate = {
        name: 'Kit-Kat',
        description: 'Oat cake soufflé powder carrot cake gummi bears. Cotton candy danish jelly-o wafer gummi bears cookie topping. Croissant icing jelly lemon drops muffin lollipop croissant jelly macaroon. Sweet roll candy topping icing cake candy cupcake chocolate. Jujubes fruitcake halvah. Cotton candy sugar plum lollipop. Powder topping marzipan. Marzipan icing muffin. Macaroon lemon drops candy canes gummi bears.',
        price: 1.99,
        inventory: 100
      }

      return request(app)
        .post('/api/admin/products', productToCreate)
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })

  describe('/api/products/:id without authorization', () => {
    it('GET /api/products/:id returns a product from the DB', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
    })

    it('PUT /api/admin/products/:id receives a 401', () => {
      const updates = {name: 'Snickers'}
      return request(app)
        .put('/api/admin/products/1')
        .send(updates)
        .expect(401)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })

  describe('as an admin user', () => {
    const authRequest = request.agent(app)
    const productToCreate = {
      name: 'Kit-Kat',
      description: 'Oat cake soufflé powder carrot cake gummi bears. Cotton candy danish jelly-o wafer gummi bears cookie topping. Croissant icing jelly lemon drops muffin lollipop croissant jelly macaroon. Sweet roll candy topping icing cake candy cupcake chocolate. Jujubes fruitcake halvah. Cotton candy sugar plum lollipop. Powder topping marzipan. Marzipan icing muffin. Macaroon lemon drops candy canes gummi bears.',
      price: 1.99,
      inventory: 100,
      images: ['/defaultPhotos/lolies.jpg'],
      selectedCategories: []
    }

    beforeEach(async () => {
      const user = {email: 'admin@test.com', password: 'test', isAdmin: true}
      await User.create(user)
      await authRequest
          .post('/auth/login')
          .send(user)
    })

    it('POST /api/admin/products creates a product in the DB', () => {
      return authRequest
        .post('/api/admin/products')
        .send(productToCreate)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.not.be.undefined
        })
    })

    it('PUT /api/admin/products/:id edits a product in the DB', async () => {
      const updates = {name: 'Snickers',description: 'Oat cake soufflé powder carrot cake gummi bears. Cotton candy danish jelly-o wafer gummi bears cookie topping. Croissant icing jelly lemon drops muffin lollipop croissant jelly macaroon. Sweet roll candy topping icing cake candy cupcake chocolate. Jujubes fruitcake halvah. Cotton candy sugar plum lollipop. Powder topping marzipan. Marzipan icing muffin. Macaroon lemon drops candy canes gummi bears.',
      price: 1.99,
      inventory: 100,selectedCategories: []}
      const product = await Product.create(productToCreate)
      return authRequest
        .put(`/api/admin/products/${product.id}`)
        .send(updates)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.equal(product.id)
          expect(res.body.name).to.equal('Snickers')
        })
    })
  })
})

