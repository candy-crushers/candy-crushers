import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  selectedCategory : {}
}

/**
 * ACTION CREATORS
 */
export const getProducts = products => {
  return {
      type: GET_PRODUCTS,
      products
  }
}

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data || initialState)))
      .catch(err => console.log(err))

export const setCategory = (category) =>
  dispatch =>
    dispatch(selectCategory(category))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case SELECT_CATEGORY:
      return {...state, selectedCategory: action.category}
    default:
      return state
  }
}
