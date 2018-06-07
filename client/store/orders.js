import axios from 'axios'

// action types
export const GOT_ORDERS = 'GOT_ORDERS'

// initial state
const initialState = []

// action creators
const createGotOrdersAction = (orders) => ({type: GOT_ORDERS, orders})

// thunk creators
export const createGetOrdersForUserThunk = () => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get('/api/user/orders')
      dispatch(createGotOrdersAction(orders))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createGetOrdersForAdminThunk = () => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get('/api/admin/orders')
      dispatch(createGotOrdersAction(orders))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}
