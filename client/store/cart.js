import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
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
    default:
      return state
  }
}
