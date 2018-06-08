import axios from 'axios'

// action creators
export const GOT_ORDER = 'GOT_ORDER'

// initial state
const initialState = {}

// action creators
const createGotOrderAction = (order) => ({type: GOT_ORDER, order})

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

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    default:
      return state
  }
}
