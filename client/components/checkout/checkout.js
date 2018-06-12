import React from 'react'
import {connect} from 'react-redux'
import {newOrderForGuestThunk, newOrderForUserThunk, createDeleteCartOnPurchaseThunk, createClearCartAction} from '../../store'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { Segment, Form, Button, Header, Dimmer, Loader, Message } from 'semantic-ui-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Confirmation, CheckoutSummary } from '../'

/**
 * COMPONENT
 */

class Checkout extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      shippingAddress: '',
      processing: false,
      error: '',
      order: {},
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

  generatePayment = async (order, token) => {
    const { data: chargeId } = await axios.post('/api/checkout/stripe', {...order, stripeToken: token.id})
    return chargeId
  }

  createOrder = async (order) => {
    let createdOrder
    if (this.props.user.id) {
      createdOrder = await this.props.newOrderForUser(order)
      await this.props.deleteCart(this.props.user.id)
    } else {
      createdOrder = await this.props.newOrderForGuest(order)
      this.props.clearCart();
    }
    return createdOrder
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
      const { token } = await this.props.stripe.createToken({email: order.email})
      this.setState({
        processing: true,
      })

      order.chargeId = await this.generatePayment(order, token)
      let createdOrder = await this.createOrder(order)

      this.setState({
        processing: false,
        success: true,
        order: createdOrder,
      })
    } catch (error) {
      this.setState({
        error: error.message,
      })
      console.error(error)
    }
  }

  render(){
    if (this.state.processing && !this.state.error) return <Dimmer active inverted><Loader inverted>Preparing Order...</Loader></Dimmer>
    if (this.state.success && this.state.order.id) return <Confirmation order={this.state.order} />

    return (
      <div>
        {this.state.error && (
          <Message negative>
            <Message.Header>Opps! Unfortunately we couldn't process your payment</Message.Header>
            <p>Please check your details and try again.</p>
          </Message>
        )}
        <Segment.Group id="checkout-form">
          <Segment>
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
                <Button color="blue" type="submit" disabled={this.props.cart.length === 0}>Place your order</Button>
              </div>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    newOrderForGuest: (order) => dispatch(newOrderForGuestThunk(order)),
    newOrderForUser: (order) => dispatch(newOrderForUserThunk(order)),
    deleteCart: (id) => {
      dispatch(createDeleteCartOnPurchaseThunk(id))
    },
    clearCart: () => {
      dispatch(createClearCartAction())
    }
  }
}

export default injectStripe(withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout)))
