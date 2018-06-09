const router = require('express').Router()
const { Order, Product } = require('../../db/models')

router.post('/', async (req, res, next) => {
    try {
      console.log(req.session);
      const order = await Order.create({
        status: req.body.status,
        subtotal: req.body.subtotal,
        shippingAddress: req.body.shippingAddress,
        email: req.body.email
      });
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
