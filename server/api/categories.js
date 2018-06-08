const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Category.findAll({
       attributes: ['id', 'name']
    })
    .then(categories => res.json(categories))
    .catch(next)
})
