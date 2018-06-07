const router = require('express').Router()
const { Order } = require('../db/models')
const { isLoggedIn } = require('./middleware')

router.use(isLoggedIn)

router.get('/', async (req, res, next) => {
  try {
    const options = {
      include: [{ all: true }],
      order: [['createdAt', 'DESC']],
    }
    if (!req.user.isAdmin) {
      options.where = {
        userId: req.user.id,
      }
    }
    const orders = await Order.findAll(options)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id, {include: [{all: true}]});
    if (!order) next() // send to 404 handler

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
