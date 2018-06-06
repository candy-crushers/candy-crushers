const router = require('express').Router()
const {Product, Review, User, Category} = require('../db/models')
module.exports = router

const checkAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const error = new Error('Not Authorized')
    error.status = 401
    next(error)
  }
}

router.get('/', (req, res, next) => {
    Product.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'name', 'price',]
      include: [Category]
    })
    .then(products => res.json(products))
    .catch(next)
})

router.post('/', checkAdminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where : {
        id : req.params.id
      }
    })

    res.json(product)
  } catch (err){
    console.error(err)
  }
})

router.put('/:id', checkAdminMiddleware, async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
      plain: true
    })

    // Model.update does not support eager loading
    const updatedProduct = await Product.findById(req.params.id)

    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
