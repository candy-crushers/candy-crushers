const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('order_products', {
    // REVIEW: price as float D:
    priceAtTime: Sequelize.FLOAT,
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
