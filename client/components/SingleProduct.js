import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct, addItem } from '../store'
import CandyItem from './CandyItem'
import ReviewAvatar from './ReviewAvatar'




class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      quantity : 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  handleChange(event) {
    event.preventDefault()
    if(event.target.value > 0){
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const quantity = this.state.quantity
    const item = {item : this.props.singleProduct, quantity}
    this.props.addToCart(item)
    this.setState({
      quantity : ''
    })
  }



  productComponent () {
    const product = this.props.singleProduct
    const showQuantity = {
      text : 'Add to Cart',
      method : 'post',
      handleChange : this.handleChange,
      handleSubmit : this.handleSubmit,
      quantity : this.state.quantity
    }
    return (
      <div>
        <CandyItem product={product} history={this.props.history} showQuantity={showQuantity} />
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
    singleProduct : state.singleProduct,
    cart : state.cart
  })
}

const mapDispatch = (dispatch) => {
  return ({
    getProduct : (id) => dispatch(fetchSingleProduct(id)),
    addToCart : (item) => dispatch(addItem(item))
  })
}


export default connect(mapState, mapDispatch)(SingleProduct);




