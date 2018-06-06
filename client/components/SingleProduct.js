import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct } from '../store'
import CandyItem from './CandyItem'
import ReviewAvatar from './ReviewAvatar'


class SingleProduct extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  productComponent () {
    const product = this.props.singleProduct
    return (
      <div>
            <CandyItem product={product.product} />
            <div className="singleProductReviews">
            {
              product.reviews.map((review) => {
                return <ReviewAvatar key={review.id} review={review} />
              })
            }
            </div>
          </div>
    )
  }

  render(){
    return (
      this.props.singleProduct.product ?  this.productComponent() : <span />)
  }
}


const mapState = (state) => {
  return({
    singleProduct : state.singleProduct
  })
}

const mapDispatch = (dispatch) => {
  return ({
    getProduct : (id) => dispatch(fetchSingleProduct(id))
  })
}


export default connect(mapState, mapDispatch)(SingleProduct);




