const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

const { isAdmin } = require('./middleware')

router.get('/', (req, res, next) => {
    Category.findAll({
       attributes: ['id', 'name']
    })
    .then(categories => res.json(categories))
    .catch(next)
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name
    })
    res.json(category);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    console.log(req.body);
    await Category.update({name: req.body.name}, {
      where: {
        id: req.params.id
      }
    })
    const updatedCategory = await Category.findById(req.params.id);
    res.json(updatedCategory)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end();
  } catch (err) {
    next(err)
  }
})
