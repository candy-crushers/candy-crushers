const router = require('express').Router()
const {Product} = require('../db/models')
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
    const product = await Product.findOne({
      where : {
        id : req.params.id
      }
    })
    res.json(product)
  }catch(err){
    console.error(err)
  }
})
