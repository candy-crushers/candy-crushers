import axios from 'axios'
import store from './'
// action types
export const GOT_ORDERS = 'GOT_ORDERS'
export const NEW_ORDER = 'NEW_ORDER'


// initial state
const initialState = []

// action creators
const createGotOrdersAction = (orders) => ({type: GOT_ORDERS, orders})
const newOrderAction = (order) => ({type: NEW_ORDER, order})


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

const sendConfirmationEmail = (order) => {
  const emailOptions = {
    to: order.email,
    order,
  }
  return axios.post('/api/confirmation', emailOptions)
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
      const {data: newOrder} = await axios.post('/api/guest/orders', order)
      dispatch(newOrderAction(newOrder))
      await sendConfirmationEmail(newOrder)
    } catch (error) {
      console.error(error);
    }
  }
}

export const newOrderForUserThunk = (order) => {
  return async (dispatch) => {
    try{
      const userId = store.getState().user.id;
      const {data: newOrder} = await axios.post(`/api/users/${userId}/orders`, order)
      dispatch(newOrderAction(newOrder))
      await sendConfirmationEmail(newOrder)
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
    case NEW_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}
