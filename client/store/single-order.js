import axios from 'axios'

// action creators
export const GOT_ORDER = 'GOT_ORDER'
export const EDIT_ORDER_FOR_ADMIN = 'EDIT_ORDER_FOR_ADMIN'

// initial state
const initialState = {}

// action creators
const createGotOrderAction = (order) => ({type: GOT_ORDER, order})
const editOrderForAdminAction = (status) => ({type: EDIT_ORDER_FOR_ADMIN, status})

// thunk creators
export const createGetOrderForUserThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.get(`/api/user/orders/${id}`)
      dispatch(createGotOrderAction(order))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createGetOrderForAdminThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.get(`/api/admin/orders/${id}`)
      dispatch(createGotOrderAction(order))
    } catch (error) {
      console.error(error)
    }
  }
}

const sendStatusChangeEmail = (status, orderId) => {
  if (status.status === 'Shipped') {
    return axios.post('/api/email/shipped', {id: orderId})
  } else if (status.status === 'Delivered') {
    return axios.post('/api/email/delivered', {id: orderId})
  }

  return false
}

export const createEditOrderForAdminThunk = (id, status) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/admin/orders/${id}`, status)
      dispatch(editOrderForAdminAction(status))
      await sendStatusChangeEmail(status, id)
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    case EDIT_ORDER_FOR_ADMIN:
      return {...state, status: action.status.status}
    default:
      return state
  }
}
