import axios from 'axios'
import history from '../history'


// action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_SINGLE_PRODUCT = 'ADD_SINGLE_PRODUCT'
const EDIT_SINGLE_PRODUCT = 'EDIT_SINGLE_PRODUCT'

// initial state
const initialState = {}

// action creators
const getSingleProduct = (product) => ({ type: GET_SINGLE_PRODUCT, product })
const createAddProductAction = (product) => ({ type: ADD_SINGLE_PRODUCT, product })
const createEditProductAction = (product) => ({ type: EDIT_SINGLE_PRODUCT, product })

// thunk creators
export const fetchSingleProduct = (id) =>
dispatch =>
  axios.get(`/api/products/${id}`)
  .then((res) => {
    dispatch(getSingleProduct(res.data || initialState))
  })
    .catch(err => console.error(err))

export const createPostProductThunk = (product) => {
  return async (dispatch) => {
    try {
      const { data: newProduct } = await axios.post('/api/products', product)
      dispatch(createAddProductAction(newProduct))

      return newProduct.id
    } catch (error) {
      console.error(error)
    }
  }
}

export const createPutProductThunk = (product) => {
  return async (dispatch) => {
    try {
      const { data: updatedProduct } = await axios.put(`/api/products/${product.id}`, product)
      dispatch(createEditProductAction(updatedProduct))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
    case ADD_SINGLE_PRODUCT:
    case EDIT_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
