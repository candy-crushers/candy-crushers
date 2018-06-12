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
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      images: req.body.images
    })
    await Promise.all(req.body.selectedCategories.map( async (id) => {
      const category = await Category.findById(id);
      await product.addCategory(category);
    }))
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

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      images: req.body.images
    }, {
      where: {
        id: req.params.id,
      },
    })
    // Model.update does not support eager loading
    const updatedProduct = await Product.findById(req.params.id,{
      include: [Category]
    })
    const selectedCategoriesId = req.body.selectedCategories.map(id => id)
    const categories = await Category.findAll( {where: { id: selectedCategoriesId } } )
    await updatedProduct.setCategories(categories);
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
