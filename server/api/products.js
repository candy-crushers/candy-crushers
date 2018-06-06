const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll(
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'name', 'price',]
    )
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    const reviews = await Review.findAll({
      where : {
        productId : req.params.id
      },
      include : {
        all : true
      }
    })
    const data = { product, reviews }
    res.json(data)
  }catch(err){
    console.error(err)
    next(err)
  }
})
