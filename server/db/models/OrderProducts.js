const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('order_products', {
    priceAtTime: {
      type : Sequelize.INTEGER,
      allowNull : false,
      get() {
        return (this.getDataValue('priceAtTime') / 100)
      },
      set(priceAtTime){
        this.setDataValue('priceAtTime', Number((priceAtTime*100).toFixed(0)))
      }
    },
    quantity : {
        type : Sequelize.INTEGER,
        defaultValue : 1
    },
    subTotal : {
        type : Sequelize.VIRTUAL,
        get() {
            return (this.getDataValue('priceAtTime') * this.getDataValue('quantity')) / 100
        }

    }
})


module.exports = OrderProducts
