import axios from 'axios'

// action types
export const GOT_ORDERS = 'GOT_ORDERS'
export const NEW_ORDER_FOR_GUEST = 'NEW_ORDER_FOR_GUEST'

// initial state
const initialState = []

// action creators
const createGotOrdersAction = (orders) => ({type: GOT_ORDERS, orders})
const newOrderForGuestAction = (order) => ({type: NEW_ORDER_FOR_GUEST, order})

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

export const newOrderForGuestThunk = (order) => {
  return async (dispatch) => {
    try{
      console.log('Order in thunk', order)
      const {data: newOrder} = await axios.post('/api/guest/orders', order)
      dispatch(newOrderForGuestAction(newOrder))
    } catch (error) {
      console.error(error);
    }
  }
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    case NEW_ORDER_FOR_GUEST:
      return [...state, action.order]
    default:
      return state
  }
}
