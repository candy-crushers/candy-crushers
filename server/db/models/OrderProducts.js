const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')




const UserProjects = db.define('userProjects', {
    priceAtTime: Sequelize.FLOAT
})


module.exports = UserProjects
