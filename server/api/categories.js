const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

// REVIEW: ensure consistent use of async/await and indentation
router.get('/', (req, res, next) => {
    Category.findAll({
      // REVIEW: this was copied from somewhere, make sure to delete irrelevant comments
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
       attributes: ['id', 'name']
    })
    .then(categories => res.json(categories))
    .catch(next)
})
