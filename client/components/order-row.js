import React from 'react'
import { Link } from 'react-router-dom'

const OrderRow = (props) => {
  const { order } = props
  return (
    <div className="order-row">
      <h2>{order.name}</h2>
      <p>Number of Products: {order.products.length}</p>
      <p>Subtotal: ${order.subtotal}</p>
      <p>Status: {order.status}</p>
      <p>Ordered: {(new Date(order.createdAt)).toDateString()}</p>
      <Link to={`/orders/${order.id}`}>View Details</Link>
    </div>
  )
}

export default OrderRow
