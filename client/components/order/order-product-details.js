import React from 'react'
import { Link } from 'react-router-dom'
import {DisplayAmount} from '../'
import {Table} from 'semantic-ui-react'

const OrderProductDetails = ({ products }) => {
  return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Price</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Subtotal</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { products && products.map(product => (
            <Table.Row key={product.id}>
              <Table.Cell><Link to={`/products/${product.id}`}>{product.name}</Link></Table.Cell>
                <Table.Cell textAlign='center'>{product.order_products.quantity}</Table.Cell>
                <Table.Cell textAlign='right'><DisplayAmount amount={product.price} /></Table.Cell>
                <Table.Cell textAlign='right'><DisplayAmount amount={product.price * product.order_products.quantity} /></Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>
  )
}

export default OrderProductDetails
