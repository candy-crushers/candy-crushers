const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const { Review, User } = require('./')

const Product = db.define('product', {
   name: {
     type : Sequelize.STRING,
     allowNull : false,
   },
   description : {
     type : Sequelize.TEXT,
     allowNull : false
   },
  // REVIEW: Price as float D:
   price : {
     type : Sequelize.FLOAT,
     allowNull : false
   },
  // REVIEW: talk inventroy
   inventory : {
     type : Sequelize.INTEGER,
     allowNull : false
   },
   images : {
     type : Sequelize.ARRAY(Sequelize.STRING),
     defaultValue : ['/defaultPhotos/lolies.jpg']
   },
})

//-----HOOKS-----
Product.beforeValidate(instance => {
  if (!Array.isArray(instance.images)) {
    instance.images = instance.images.split(',')
  }
})

module.exports = Product
