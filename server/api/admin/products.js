const router = require('express').Router()
const {Product, Category} = require('../../db/models')

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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
    const updatedProduct = await Product.findById(req.params.id, {
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

module.exports = router
