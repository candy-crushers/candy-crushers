const router = require('express').Router()
const Op = require('sequelize').Op
const {Product, Review, User, Category} = require('../db/models')
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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where : {
        id : req.params.id
      },
      include: [Category]
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
