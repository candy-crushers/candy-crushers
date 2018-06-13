import React, { Component } from 'react'
import {Table, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {ChangeStatusForm} from '../'

function OrderItemRow(props){
  const { order } = props
  return (
      <Table.Row  >
        <Table.Cell >
        {<Link to={'/admin/orders/' + order.id} >
          <Header as='h4' >
            <Header.Content>
              click to view order <br />#{order.id}
            </Header.Content>
          </Header>
          </Link>}
        </Table.Cell>
        <Table.Cell>{order.products.length}</Table.Cell>
        <Table.Cell>${order.subtotal}</Table.Cell>
        <Table.Cell>{order.orderDate}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
        {/*
        //this will be left out for presentation
        <Table.Cell>{<ChangeStatusForm status={order.status} changeStatus={(e, data) => { props.changeStatus(e, data.value, order.id)}} />}</Table.Cell> */}
      </Table.Row>)
}

export default OrderItemRow
