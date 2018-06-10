import orders from './'


export const FILTER_ORDER_BY_STATUS_FOR_ADMIN = 'FILTER_ORDER_BY_STATUS_FOR_ADMIN'
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

const initialState = []

const filterOrdersByStatusAction = (status) => ({type: FILTER_ORDER_BY_STATUS_FOR_ADMIN, status})
const getAllOders = () => ({type: GET_ALL_ORDERS})


export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_ORDER_BY_STATUS_FOR_ADMIN:
      return state.filter(order => order.status === action.status)
    case GET_ALL_ORDERS:
      return orders
    default:
      return state
  }
}
