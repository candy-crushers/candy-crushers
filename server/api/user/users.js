const router = require('express').Router()
const { User } = require('../../db/models')

router.put('/', async (req, res, next) => {
  const userInfo = {
    cart: req.body.cart,
  }
  await User.update(userInfo, {
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(200)
})

module.exports = router
