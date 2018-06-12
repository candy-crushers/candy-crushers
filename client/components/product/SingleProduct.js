import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSingleProduct, addItem } from '../../store'
import {CandyItem, ReviewAvatar, AddReview} from '../'
import { List, Container, Divider, Segment, Message } from 'semantic-ui-react'



class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      quantity : 1,
      selected : 0
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.getProduct(id)
  }

  handleChange = (event) => {
    event.preventDefault()
    if(event.target.value > 0){
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const quantity = this.state.quantity
    const item = {item : this.props.singleProduct, quantity: Number(quantity)}
    this.props.addToCart(item)
    this.setState({
      quantity : 1
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
      <Container>
        <br /><br />
        {this.props.outOfStock && (
          <Message negative>
            <Message.Header>We're sorry, but this product is currently unavailable.</Message.Header>
          </Message>
        )}
        <Segment>
        <Container>
        <CandyItem product={product} history={this.props.history} showQuantity={showQuantity} outOfStock={this.props.outOfStock} />
        </Container><br /><br />
        <Divider horizontal></Divider>
        </Segment>
        <Container>
        <Segment>
        <List relaxed>
        {
          (product.reviews && product.reviews.length > 0) && product.reviews.map((review) => {
              return <List.Item key={review.id}><ReviewAvatar  review={review} /></List.Item>
            })
        }
        <AddReview />
        </List>
        </Segment>
        </Container>
      </Container>
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
    cart : state.cart,
    outOfStock: state.singleProduct.inventory === 0
  })
}

const mapDispatch = (dispatch) => {
  return ({
    getProduct : (id) => dispatch(fetchSingleProduct(id)),
    addToCart : (item) => dispatch(addItem(item))
  })
}


export default connect(mapState, mapDispatch)(SingleProduct);
