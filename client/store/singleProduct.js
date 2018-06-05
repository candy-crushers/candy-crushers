import axios from 'axios'


const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const getSingleProduct = (product) => { type : GET_SINGLE_PRODUCT, product }

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      const product = response.data
      dispatch(getSingleProduct(product))
    }catch(err){
      console.error(err)
    }
  }
}

const singleProduct = {}

export default function (state = singleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
