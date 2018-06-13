const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2')

router.post('/stripe', (req, res, next) => {
  const stripeToken = req.body.stripeToken
  const amount = req.body.subtotal

  stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'CandyCrushers.com Order',
    source: stripeToken,
    receipt_email: req.body.email
  }, (error, charge) => {
    if (error) {
      next(error)
    } else {
      res.status(200).send(charge.id)
    }
  })
})

module.exports = router
