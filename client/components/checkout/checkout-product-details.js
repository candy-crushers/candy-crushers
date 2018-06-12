import React from 'react'
import { Link } from 'react-router-dom'
import {DisplayAmount} from '../'
import { Segment, Table } from 'semantic-ui-react'

const CheckoutProductDetails = ({cart}) => {
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
        { cart && cart.map(product => (
          <Table.Row key={product.item.id}>
            <Table.Cell><Link to={`/products/${product.item.id}`}>{product.item.name}</Link></Table.Cell>
              <Table.Cell textAlign='center'>{product.quantity}</Table.Cell>
              <Table.Cell textAlign='right'><DisplayAmount amount={product.item.price} /></Table.Cell>
              <Table.Cell textAlign='right'><DisplayAmount amount={product.item.price * product.quantity} /></Table.Cell>
          </Table.Row>
        ))
        }
      </Table.Body>
    </Table>
  )
}

export default CheckoutProductDetails
