import React from 'react'
import { Link } from 'react-router-dom'

const OrderRow = (props) => {
  const { order } = props
  const path = props.path ? props.path : '/orders'

  return (
    <div className="order-row">
      <h2>{order.name}</h2>
      <p>Number of Products: {order.products.length}</p>
      <p>Subtotal: ${order.subtotal}</p>
      <p>Status: {order.status}</p>
      <p>Ordered: {order.orderDate}</p>
      <Link to={`${path}/${order.id}`}>View Details</Link>
    </div>
  )
}

export default OrderRow
