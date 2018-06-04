const User = require('./User')
const Category = require ('./Category')
const Order = require ('./Order')
const Product = require('./Product')
const Review = require('./Review')
const db = require('../db.js')


Product.belongsToMany(Category, { through : 'productCategories'})
Category.belongsToMany(Product, { through : 'productCategories'})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)


Product.belongsToMany(Order, {through : 'orderProducts'})
Order.belongsToMany(Product, { through : 'orderProducts'})

User.hasMany(Order)
Order.belongsTo(User)


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
  Order
}
