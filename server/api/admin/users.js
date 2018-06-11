const router = require('express').Router()
const {User} = require('../../db/models')
const {isAdmin} = require('../middleware')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
     await User.update({isAdmin: req.body.isAdmin},
    {
      where: { id: req.params.id }
    })
    const updatedUser = await User.findById(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})
