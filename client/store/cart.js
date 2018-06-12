import axios from 'axios'
import { logout } from './user';

/**
 * ACTION TYPES
 */
const GOT_CART_FROM_STORAGE = 'GOT_CART_FROM_STORAGE'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */

 const initialState = []

/**
 * ACTION CREATORS
 */
export const gotCartFromStorage = (cart) => {
  return {
      type: GOT_CART_FROM_STORAGE,
      cart
  }
}

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

export const editquantity = item => {
  return {
    type: EDIT_QUANTITY,
    item
  }
}

export const deleteItem = itemId => {
  return {
    type: DELETE_ITEM,
    itemId
  }
}

export const createClearCartAction = () => {
  return {
    type: CLEAR_CART
  }
}

/**
 * THUNK CREATORS
 */

 // helper function
const mergeCarts = (userCart, guestCart) => {
  return guestCart.reduce((acc, item) => {
    const index = acc.findIndex(cartInst => cartInst.item.id === item.item.id)
    if (index !== -1) {
      acc[index].quantity = Number(acc[index].quantity) + Number(item.quantity)
      return acc
    } else {
      return [...acc, item]
    }
  }, userCart)
}

export const getCartFromStorageThunk = (user) => {
  return (dispatch) => {
    let cart = []
    if (user.id && user.cart) {
      cart = user.cart
    } else if (localStorage.hasOwnProperty('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
      localStorage.removeItem('cart')
    }
    dispatch(gotCartFromStorage(cart))
  }
}

export const createSaveCartOnLogoutThunk = (userId, cart) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/user/users/${userId}`, {cart})
      dispatch(logout())
      dispatch(createClearCartAction())
    } catch (error) {
      console.error(error)
    }
  }
}

export const createDeleteCartOnPurchaseThunk = (userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/user/users/${userId}`, {cart: null})
      dispatch(createClearCartAction())
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_CART_FROM_STORAGE:
      // this will update the quantities of the arrays when the same item exists
      return mergeCarts(action.cart, [...state])
    case ADD_ITEM:
      return mergeCarts([...state],[action.item]);
    case EDIT_QUANTITY:
      return state.map(cartItem => {
        if (cartItem.item.id !== Number(action.item.id)) {
          return cartItem
        }
        return {...cartItem, quantity: action.item.quantity }
      })
    case DELETE_ITEM:
      return state.filter(cartItem => cartItem.item.id !== Number(action.itemId))
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
