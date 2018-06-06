'use strict'

const db = require('../server/db')
const { Product, Category, Review, Order, User } = require('../server/db/models')
const { reviewData, categoryData, productData, userData, orderData } = require('./seed-data');

const shuffle = () => 0.5 - Math.random()
const randomQuantity = () => Math.floor(Math.random() * 10) + 1

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const userP = User.bulkCreate(userData, { individualHooks: true }) // must hit salting hooks
  const categoryP = Category.bulkCreate(categoryData)
  const orderP = Order.bulkCreate(orderData)
  const productP = Product.bulkCreate(productData)

  await Promise.all([userP, categoryP, orderP, productP]);
  // Reviews require users and products to be created so that foreign keys can be placed
  await Review.bulkCreate(reviewData)

  // Associations cannot be set immediately after creation (https://github.com/sequelize/sequelize/issues/864)
  await db.sync()
  const products = await Product.findAll()
  const categories = await Category.findAll()
  const users = await User.findAll()
  const orders = await Order.findAll()

  await Promise.all(products.map(product => {
    const randomCategories = categories.sort(shuffle).slice(0, 2)
    return product.setCategories(randomCategories)
  }))

  await Promise.all(orders.map(order => {
    const randomProducts = products.sort(shuffle).slice(0, 5)
    const subtotal = randomProducts.reduce((a, b) => a + b.price, 0)
    const user = users.sort(shuffle)[0]

    return order.update({subtotal, userId: user.id, email: user.email}).then((orderInst) => {
      return Promise.all(randomProducts.map(product => orderInst.addProduct(product, {
        through: {
          priceAtTime: product.price,
          quantity: randomQuantity()
        }
      })))
    })
  }))

  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  seed()
  .catch(err => {
    console.error(err)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

  console.log('seeding...')
}

module.exports = seed
