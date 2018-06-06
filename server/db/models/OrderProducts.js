const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')




const UserProjects = db.define('userProjects', {
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


module.exports = UserProjects
