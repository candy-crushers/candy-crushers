const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/:id/orders', async (req, res, next) => {
  console.log(`I'm here`, req.params.id);
  try {
    const order = await Order.create({
      status: req.body.status,
      subtotal: req.body.subtotal,
      shippingAddress: req.body.shippingAddress,
      email: req.body.email,
    });
    const user = await User.findById(req.params.id);
    order.setUser(user);
    await Promise.all(req.body.productsInCart.map( async (productInCart)  => {
      const orderProduct = await Product.findById(productInCart.id);
      await order.addProduct(orderProduct, {
        through: {
          priceAtTime: orderProduct.price,
          quantity: productInCart.quantity
        }
      })
      await orderProduct.decrement('inventory', { by: productInCart.quantity})
    }))

    // after products have been added, retrieve the eager loaded instance to send back
    const newOrderWithProducts = await Order.findById(order.id, {
      include: [{all: true}],
    })
    res.status(201).json(newOrderWithProducts);
  } catch (error) {
    next(error)
  }
})

