const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
   name: {
     type : Sequelize.STRING,
     allowNull : false,
   },
   description : {
     type : Sequelize.TEXT,
     allowNull : false
   },
   price : {
     type : Sequelize.FLOAT,
     allowNull : false
   },
   inventory : {
     type : Sequelize.INTEGER,
     allowNull : false
   },
   images : {
     type : Sequelize.ARRAY(Sequelize.STRING),
     defaultValue : ['/defaultPhotos/lolies.jpg']
   },


})

module.exports = Product
