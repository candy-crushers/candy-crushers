import React from 'react'
import {DisplayAmount} from '../'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


function OrderDetailUser({ order }){
  if (!order.id) return <div />
  const addrLine1Indx = order.shippingAddress.indexOf(',')
  const address = order.shippingAddress.slice(0, addrLine1Indx) + order.shippingAddress.slice(addrLine1Indx + 1)
  return (
    <div>
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Order Date</Table.HeaderCell>
          <Table.HeaderCell>Shipped To</Table.HeaderCell>
          <Table.HeaderCell >Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      <Table.Row>
              <Table.Cell>{order.orderDate}</Table.Cell>
              <Table.Cell>{address}</Table.Cell>
              <Table.Cell>{<DisplayAmount amount={order.subtotal} />}</Table.Cell>
            </Table.Row>

      </Table.Body>
      </Table>

    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell >Price</Table.HeaderCell>
          <Table.HeaderCell >Subtotal</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          order.products.map((product) =>{
            return (<Table.Row key={product.id}>
            <Table.Cell>{product.images[7]}</Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.order_products.quantity}</Table.Cell>
              <Table.Cell>{<DisplayAmount amount={product.price} />}</Table.Cell>
              <Table.Cell>{<DisplayAmount amount={product.order_products.quantity * product.price} />}</Table.Cell>
            </Table.Row>)}
          )
        }
      </Table.Body>
      </Table>
      </div>)


}



export default OrderDetailUser




