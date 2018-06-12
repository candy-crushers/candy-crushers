import React, { Component } from 'react'
import {Table, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function OrderItemRow(props){
  const { order } = props
  return (
      <Table.Row  >
        <Table.Cell >
        {<Link to={'/admin/orders' + order.id} >
          <Header as='h4' >
            <Header.Content>
              #{order.id}
            </Header.Content>
          </Header>
        </Link>}
        </Table.Cell>
        <Table.Cell>{order.products.length}</Table.Cell>
        <Table.Cell>${order.subtotal}</Table.Cell>
        <Table.Cell>{order.orderDate}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
      </Table.Row>)
}

export default OrderItemRow
