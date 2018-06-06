import axios from 'axios'

// action types
const GET_ORDERS = 'GET_ORDERS'

// initial state
const initialState = []

// action creators
const createGotOrdersAction = (orders) => ({type: GET_ORDERS, orders})

// thunk creators
export const createGetOrdersThunk = () => {
  return async (dispatch) => {
    const { data: orders } = await axios.get('/api/orders')
    dispatch(createGotOrdersAction(orders))
  }
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
