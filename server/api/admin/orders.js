const router = require('express').Router()
const { Order } = require('../../db/models')

router.get('/', async (req, res, next) => {
  const options = {
    include: [{ all: true }],
    order: [['createdAt', 'DESC']],
  }
  const orders = await Order.findAll(options)
  res.json(orders)
})

router.get('/:id', async (req, res, next) => {
  const order = await Order.findById(req.params.id, {include: [{all: true}]});
  if (!order) {
    next() // send to 404 handler
  } else {
    res.json(order)
  }
})

module.exports = router
