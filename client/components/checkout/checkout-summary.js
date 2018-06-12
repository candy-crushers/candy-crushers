import React from 'react'
import {DisplayAmount, CheckoutProductDetails} from '../'
import { Header } from 'semantic-ui-react'

const CheckoutSummary = ({ cart, subtotal }) => {
  return (
    <div>
      <CheckoutProductDetails cart={cart} />
      <div>
        <Header as='h4' textAlign='right'>Total: <DisplayAmount amount={subtotal} /></Header>
      </div>
    </div>
  )
}

export default CheckoutSummary
