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

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
      status: req.body.status,
      subtotal: req.body.subtotal,
      shippingAddress: req.body.shippingAddress,
      email: req.body.email,
    });
    const user = await User.findById(req.session.passport.user);
    order.setUser(user);
    req.body.productsInCart.map( async (productInCart)  => {
      const orderProduct = await Product.findById(productInCart.id);
      order.addProduct(orderProduct, {
        through: {
          priceAtTime: orderProduct.price,
          quantity: productInCart.quantity
        }
      })
      orderProduct.decrement('inventory', { by: productInCart.quantity})
    })
    res.status(201).json(order);
  } catch (error) {
    next(error)
  }
})


module.exports = router
