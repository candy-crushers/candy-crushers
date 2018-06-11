const router = require('express').Router()
const { Order, Product } = require('../../db/models')

router.post('/', async (req, res, next) => {
    try {
      const order = await Order.create({
        status: req.body.status,
        subtotal: req.body.subtotal,
        shippingAddress: req.body.shippingAddress,
        email: req.body.email,
        sessionId: req.session.id,
        chargeId: req.body.chargeId,
      });
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

module.exports = router
