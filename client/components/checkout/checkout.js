import React from 'react'
import {connect} from 'react-redux'
import {newOrderForGuestThunk, newOrderForUserThunk, createDeleteCartOnPurchaseThunk, createClearCartAction} from '../../store'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { Segment, Form, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { CheckoutSummary } from '../'

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

  componentDidMount () {
    if (this.props.user.email) {
      this.setState({
        email: this.props.user.email
      })
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.user.email && nextProps.user.email !== this.state.email) {
      this.setState({
        email: nextProps.user.email
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

    try {
      const { token } = await this.props.stripe.createToken({email})
      const { data: chargeId } = await axios.post('/api/checkout/stripe', {...order, stripeToken: token.id})
      order.chargeId = chargeId
      if (this.props.user.id) {
        await this.props.newOrderForUser(order)
        await this.props.deleteCart(this.props.user.id)
      } else {
        await this.props.newOrderForGuest(order)
        this.props.clearCart();
      }
    } catch (error) {
      console.error(error)
    }
  }

  render(){
    return (
      <Segment.Group id="checkout-form">
        <Segment>
          <Header color='red' as='h3'>Order Summary</Header>
          <CheckoutSummary cart={this.props.cart} subtotal={this.props.subtotal} />
        </Segment>
        <Segment>
          <Header color='red' as='h3'>Payment Information</Header>
          <Form className="checkout" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <Form.Field>
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" value={this.state.email} required />
            </Form.Field>
            <Form.Field>
              <label htmlFor="shippingAddress">Shipping Address: </label>
              <input type="text" name="shippingAddress" value={this.state.shippingAddress} required />
            </Form.Field>
            <Form.Field>
              <label>
                Card details
                <CardElement />
              </label>
            </Form.Field>
            <div className="checkout-buttons">
              <Button color="blue" type="submit">Place your order</Button>
            </div>
          </Form>
        </Segment>
      </Segment.Group>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
    const subtotal = state.cart.reduce( (total, cartItem) => {
      return (total + cartItem.item.price * cartItem.quantity)
    }, 0 )
    const getProductsInCart = () => state.cart.map( cartItem => ({ id: cartItem.item.id, quantity:cartItem.quantity}) )
    return {
      subtotal,
      productsInCart: getProductsInCart(),
      user: state.user,
      cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newOrderForGuest: (order) => {
      dispatch(newOrderForGuestThunk(order))
      .then( () => {
        ownProps.history.push('/checkout/confirmation')
      })
    },
    newOrderForUser: (order) => {
      dispatch(newOrderForUserThunk(order))
      .then( () => {
        ownProps.history.push('/checkout/confirmation')
      })
    },
    deleteCart: (id) => {
      dispatch(createDeleteCartOnPurchaseThunk(id))
    },
    clearCart: () => {
      dispatch(createClearCartAction())
    }
  }
}

export default injectStripe(withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout)))
