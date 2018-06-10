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

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { status } = req.body
    console.log('route', req.body )

    await Order.update({ status }, {
      where : {
        id
      },
    })
    const updatedOrder = await Order.findById(id)
    res.json(updatedOrder)
  }catch(error){
    next(error)
  }
  const updates = { status, subtotal, shippingAddress, email, sessionId }
  next()
})

// router.put('/:id', isAdmin, async (req, res, next) => {
//   try {
//     await Product.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })
//     // Model.update does not support eager loading
//     const updatedProduct = await Product.findById(req.params.id)
//     res.json(updatedProduct)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
