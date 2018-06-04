const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
   status: {
     type : Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
     allowNull : false,
   },
   subtotal : {
     type : Sequelize.FLOAT,
     allowNull : false
   },
   shippingAddress : {
     type : Sequelize.STRING,
     allowNull : false
   },
   email : {
     type : Sequelize.STRING
   },
   sessionId : {
     type : Sequelize.STRING //integer?
   }
})

module.exports = Order
