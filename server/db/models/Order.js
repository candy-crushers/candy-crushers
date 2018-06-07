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
   },
   shippingDate: {
     type: Sequelize.DATE,
     get () {
      return this.formatDate(this.getDataValue('shippingDate'))
     }
   },
   deliveryDate: {
     type: Sequelize.DATE,
     get () {
       return this.formatDate(this.getDataValue('deliveryDate'))
     }
   },
   orderDate: {
     type: Sequelize.VIRTUAL,
     get () {
      return this.formatDate(this.getDataValue('createdAt'))
     }
   }
})

Order.prototype.formatDate = function (date) {
  return date ? (new Date(date)).toDateString() : ''
}

module.exports = Order
