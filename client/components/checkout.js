import React from 'react'
import {connect} from 'react-redux'
import {newOrderForGuestThunk, newOrderForUserThunk, me, createClearCartAction} from '../store'
//import { Link } from 'react-router-dom'
//import {Container, Image, Segment} from 'semantic-ui-react'

/**
 * COMPONENT
 */

class Checkout extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      shippingAddress: ''
    }
  }

  async componentDidMount() {
    await this.props.getUser();
    if(this.props.user.email) {
      this.setState({
        email: this.props.user.email
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const {email, shippingAddress} = this.state
    const {subtotal, productsInCart} = this.props
    const status = 'Created'
    const order = {
      status, subtotal, email, shippingAddress, productsInCart
    }
    if(this.props.user.id)
      await this.props.newOrderForUser(order)
    else
      await this.props.newOrderForGuest(order);
    this.props.clearCart();
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" value={this.state.email} />
            </div>
            <div>
              <label htmlFor="shippingAddress">Shipping Address: </label>
              <input type="text" name="shippingAddress" value={this.state.shippingAddress} />
            </div>
            <button type="submit">Purchase</button>
      </form>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
    const calculatesubtotal = () =>
      state.cart.reduce( (subtotal, cartItem) => subtotal +
      (Number(cartItem.item.price) * cartItem.quantity * 100).toFixed(0) / 100
      , 0 )
    const getProductsInCart = () => state.cart.map( cartItem => ({ id: cartItem.item.id, quantity:cartItem.quantity}) )
    return {
      subtotal: calculatesubtotal(),
      productsInCart: getProductsInCart(),
      user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newOrderForGuest: (order) => {
      dispatch(newOrderForGuestThunk(order))
      .then( () => {
        ownProps.history.push('/guest/orders/confirmation')
      })
    },
    newOrderForUser: (order) => {
      dispatch(newOrderForUserThunk(order))
      .then( () => {
        ownProps.history.push('/user/orders/confirmation')
      })
    },
    getUser: () => {
      dispatch(me());
    },
    clearCart: () => {
      dispatch(createClearCartAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
