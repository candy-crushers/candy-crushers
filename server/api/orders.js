const router = require('express').Router()
const { Order, Product, User } = require('../db/models')

const checkLoggedInMiddleware = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const error = new Error('Not Authorized')
    error.status = 401
    next(error)
  }
}

router.get('/', checkLoggedInMiddleware, async (req, res, next) => {
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
})

module.exports = router
