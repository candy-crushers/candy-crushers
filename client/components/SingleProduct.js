import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store'
import CandyItem from './CandyItem'
import ReviewAvatar from './ReviewAvatar'






class SingleProduct extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(<div>
        <CandyItem product={...this.props.product} />
        <div className="singleProductReviews">
        {
          product.reviews.map((review) => {
            <ReviewAvatar review={review} />
          })
        }
        </div>
      </div>)
  }
}

const mapState = (state) => {
  return({
    product : state.singleProduct
  })
}

const mapDispatch = (dispatch) => {
  return ({
    getProduct : () => dispatch(fetchSingleProduct())
  })
}


export default connect(mapState, mapDispatch)(SingleProduct);




