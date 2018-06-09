const router = require('express').Router()
const { Order, User } = require('../../db/models')

router.get('/', async (req, res, next) => {
  const options = {
    include: [{ all: true }],
    order: [['createdAt', 'DESC']],
    where: {
      userId: req.user.id,
    },
  }
  const orders = await Order.findAll(options)
  res.json(orders)
})

router.get('/:id', async (req, res, next) => {
  const options = {
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    include: [{all: true}],
  }
  const order = await Order.findOne(options);
  if (!order) {
    next() // send to 404 handler
  } else {
    res.json(order)
  }
})

module.exports = router
