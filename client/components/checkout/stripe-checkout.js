import React from 'react'
import { Elements } from 'react-stripe-elements'
import { Checkout } from '../'

const StripeCheckout = () => {
  return (
    <Elements>
      <Checkout />
    </Elements>
  )
}

export default StripeCheckout
