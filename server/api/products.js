const router = require('express').Router()
const Op = require('sequelize').Op
const {Product, Review, User, Category} = require('../db/models')
const { isAdmin } = require('./middleware')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll({
      include: [Category],
      where: {
        inventory: {
          [Op.gt]: 0
        }
      }
    })
    .then(products => res.json(products))
    .catch(next)
})

router.post('/', isAdmin, async (req, res, next) => {
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

router.post('/:id/reviews', async (req, res, next) => {
  const reviewData = {
    text: req.body.text,
    stars: req.body.stars,
    productId: req.body.productId,
    userId: req.body.userId,
  }

  const review = await Review.create(reviewData)
  const reviewWithUser = await Review.findById(review.id, {
    include: [User]
  })
  res.status(201).send(reviewWithUser)
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    // Model.update does not support eager loading
    const updatedProduct = await Product.findById(req.params.id)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
