import axios from 'axios'
import history from '../history'


const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getSingleProduct = (product) => ({ type : GET_SINGLE_PRODUCT, product })

const singleProduct = {}

export const fetchSingleProduct = (id) =>
dispatch =>
axios.get(`/api/products/${id}`)
.then((res) =>{
  console.log('hello')
  dispatch(getSingleProduct(res.data || initialState))
})
  .catch(err => console.log(err))


  // console.log('hello')
  // return async (dispatch) => {
  //   try {
  //     const response = await axios.get(`/api/products/${id}`)
  //     const product = response.data
  //     dispatch(getSingleProduct(product))
  //   }catch(err){
  //     console.error(err)
  //   }
  // }




export default function (state = singleProduct, action) {
  console.log('hello from reducer')
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
