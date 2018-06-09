const User = require('./user')
const Category = require ('./Category')
const Order = require ('./Order')
const Product = require('./Product')
const Review = require('./Review')
const OrderProducts = require('./OrderProducts')
const db = require('../db.js')

Product.belongsToMany(Category, { through: 'product_categories' })
Category.belongsToMany(Product, { through: 'product_categories' })

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Product.belongsToMany(Order, { through: OrderProducts })
Order.belongsToMany(Product, { through: OrderProducts })

User.hasMany(Order)
Order.belongsTo(User)

Product.addScope('defaultScope', {
  include: [{ model: Review, include: User }],
}, {
  override: true
});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  OrderProducts
}
