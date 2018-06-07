import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import categories from './categories'
import singleProduct from './singleProduct'
import orders from './orders'
import cart from './cart'

const reducer = combineReducers({user, products, categories, singleProduct, orders, cart})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: false})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './categories'
export * from './singleProduct'
export * from './orders'
export * from './cart'
