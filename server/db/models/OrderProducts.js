const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('order_products', {
    priceAtTime: {
      type : Sequelize.INTEGER,
      allowNull : false,
      get() {
        return this.getDataValue('priceAtTime')
      },
      set(priceAtTime){
        this.setDataValue('priceAtTime', priceAtTime)
      }
    },
    quantity : {
        type : Sequelize.INTEGER,
        defaultValue : 1
    },
    subTotal : {
        type : Sequelize.VIRTUAL,
        get() {
            return this.getDataValue('priceAtTime') * this.getDataValue('quantity')
        }

    }
})


module.exports = OrderProducts
