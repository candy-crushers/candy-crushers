import React from 'react'
import {DisplayAmount} from '../'

const OrderDetail = ({ order }) => {
  if (!order.id) return <div />
  const addrLine1Indx = order.shippingAddress.indexOf(',')
  return (
    <div>
      <div>
        <h3>Shipping Address</h3>
        <div>
          <p>{order.shippingAddress.slice(0, addrLine1Indx)}</p>
          <p>{order.shippingAddress.slice(addrLine1Indx + 1)}</p>
        </div>
      </div>
      <div>
        <h3>Order Summary</h3>
        <p>{order.status}</p>
        <p>Ordered on {order.orderDate}</p>
        <p>Subtotal: <DisplayAmount amount={order.subtotal} /></p>
      </div>
    </div>
  )
}

export default OrderDetail
