import React from 'react'
import {DisplayAmount, OrderProductDetails} from '../'
import { Header } from 'semantic-ui-react'

const CheckoutSummary = ({ order }) => {
  return (
    <div>
      <Header color='red' as='h3'>Order Summary</Header>
      <OrderProductDetails products={order.products} />
      <div>
        <Header as='h4' textAlign='right'>Total: <DisplayAmount amount={order.subtotal} /></Header>
      </div>
    </div>
  )
}

export default CheckoutSummary
