import React from 'react'
import { Link } from 'react-router-dom'
import {DisplayAmount} from '../'

const OrderProductDetails = ({ products }) => {
  return (
    <div>
      { products && products.map(product => (
          <div key={product.id}>
            <h4><Link to={`/products/${product.id}`}>{product.name}</Link></h4>
            <p>Quantity: {product.order_products.quantity}</p>
            <p>Price: ${(product.order_products.priceAtTime/100).toFixed(2)}</p>
            <p>Subtotal: <DisplayAmount amount={product.order_products.subTotal} /></p>
            <button type="button">Buy it again</button>
          </div>
        ))
      }
    </div>
  )
}

export default OrderProductDetails
