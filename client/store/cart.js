import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM'
/**
 * INITIAL STATE
 */

 const initialState = []

/**
 * ACTION CREATORS
 */
const getCart = () => {
  return {
      type: GET_CART
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

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case EDIT_QUANTITY:
      return state.map(cartItem => cartItem.item.id !== Number(action.item.id) ? cartItem : {...cartItem, quantity: action.item.quantity })
    case DELETE_ITEM:
      return state.filter(cartItem => cartItem.item.id !== Number(action.itemId))
    default:
      return state
  }
}
