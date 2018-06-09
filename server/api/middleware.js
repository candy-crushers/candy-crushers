const createError = (message, code) => {
  const error = new Error(message)
  error.status = code || 500
  return error
}

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

const isCurrentUser = (req, res, next) => {
  console.log('USER', req.user.id, 'PARAMS', req.params.id)
  if (req.user.id === Number(req.params.id)) {
    next()
  } else {
    next(createError('Not Authorized', 401))
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isCurrentUser
}
