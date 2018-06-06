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
        <CandyItem product={product} history={this.props.history} />
        <div className="singleProductReviews">
        {
          product.reviews && product.reviews.length > 0
          ? product.reviews.map((review) => {
              return <ReviewAvatar key={review.id} review={review} />
            })
          : <div>No reviews yet</div>
        }
        </div>
      </div>
    )
  }

  render(){
    return (
      this.props.singleProduct.id ?  this.productComponent() : <span />)
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




