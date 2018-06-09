const router = require('express').Router()
const {User} = require('../db/models')
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

router.put('/:id', async (req, res, next) => {
  if (req.user.id === req.params.id) {
    const userInfo = {
      cart: req.body.cart,
    }
    await User.update(userInfo, {
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(200)
  } else {
    const error = new Error('Not Authorized')
    error.status = 401
    next(error)
  }
})
