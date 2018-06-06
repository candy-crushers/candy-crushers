const { expect } = require('chai')
const db = require('../db')
const { Product, User, Review } = require('./')

describe('Product model', () => {
  describe('defaults', () => {
    it('a single image if none is provided', async () => {
      const productToCreate = {
        name: 'Kit-Kat',
        description: 'Oat cake soufflé powder carrot cake gummi bears.',
        price: 1.99,
        inventory: 100,
      }

      const product = await Product.create(productToCreate)
      expect(product.images).to.be.an('array')
      expect(product.images.length).to.equal(1)
      expect(product.images[0].length).to.be.greaterThan(0)
    })
  })

  describe('hooks', () => {
    describe('beforeValidate', () => {
      it('saves a string of images as an array during CREATE', async () => {
        const productToCreate = {
          name: 'Kit-Kat',
          description: 'Oat cake soufflé powder carrot cake gummi bears.',
          price: 1.99,
          inventory: 100,
          images: '/default/candy.jpg, /default/chocolate.png'
        }

        const product = await Product.create(productToCreate)
        expect(product.images).to.be.an('array')
        expect(product.images.length).to.equal(2)
      })

      it('saves a string of images as an array during UPDATE', async () => {
        const productToCreate = {
          name: 'Kit-Kat',
          description: 'Oat cake soufflé powder carrot cake gummi bears.',
          price: 1.99,
          inventory: 100,
        }
        const product = await Product.create(productToCreate)
        await product.update({images: '/default/candy.jpg, /default/chocolate.png'})
        expect(product.images).to.be.an('array')
        expect(product.images.length).to.equal(2)
      })
    })
  })

  describe('scope', () => {
    beforeEach(async () => {
      const productToCreate = {
        name: 'Kit-Kat',
        description: 'Oat cake soufflé powder carrot cake gummi bears.',
        price: 1.99,
        inventory: 100,
      }
      const userToCreate = {
        email: 'reviewer@test.com',
        password: 'review'
      }
      const [ product, user ] = await Promise.all([Product.create(productToCreate), User.create(userToCreate)])
      const reviewToCreate = {
        text: 'Thats not what i saw in my head at all mmm',
        userId: user.id,
        stars: 1,
        productId: product.id
      }

      await Review.create(reviewToCreate)
    })

    describe('defaultScope', () => {
      it('eager loads reviews and review users by default', async () => {
        const [product, ...products] = await Product.findAll()

        expect(product.reviews).to.be.an('array')
        expect(product.reviews[0].text).to.equal('Thats not what i saw in my head at all mmm')
        expect(product.reviews[0].user.email).to.equal('reviewer@test.com')
      })
    })
  })
})
