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
import singleOrder from './single-order'
import allusers from './allusers'
import axios from 'axios';

const reducer = combineReducers({user, products, categories, singleProduct, orders, singleOrder, cart, allusers})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: false})
))
const store = createStore(reducer, middleware)

const saveCartToLocalStorage = (storedCart) => {
  localStorage.setItem('cart', JSON.stringify(storedCart))
}

const saveCartToUser = async (id, storedCart) => {
  try {
    await axios.put(`/api/users/${id}`, {cart: storedCart})
  } catch (error) {
    console.error(error)
  }
}

const saveCart = () => {
  const { cart, user } = store.getState()
  if (cart.length === 0) return

  if (user.id) {
    saveCartToUser(user.id, cart)
  } else {
    saveCartToLocalStorage(cart)
  }
}

window.onbeforeunload = saveCart

export default store
export * from './user'
export * from './products'
export * from './categories'
export * from './singleProduct'
export * from './orders'
export * from './cart'
export * from './single-order'
export * from './allusers'
