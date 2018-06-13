const router = require('express').Router()

router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/users', require('./users'))

module.exports = router
