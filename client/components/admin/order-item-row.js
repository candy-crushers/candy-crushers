import React, { Component } from 'react'
import {Table, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {ChangeStatusForm, DisplayAmount} from '../'


function OrderItemRow(props){
  const { order, history } = props
  return (
      <Table.Row onClick={() => history.push(`/admin/dashboard/orders/${order.id}`)}>
        <Table.Cell >
        {<Link to={'/admin/dashboard/orders/' + order.id} >
          <Header as='h4' >#{order.id}</Header>
         </Link>}
        </Table.Cell>
        <Table.Cell>{order.products.length}</Table.Cell>
        <Table.Cell><DisplayAmount amount={order.subtotal} /></Table.Cell>
        <Table.Cell>{order.orderDate}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
        {/*
        //this will be left out for presentation
        <Table.Cell>{<ChangeStatusForm status={order.status} changeStatus={(e, data) => { props.changeStatus(e, data.value, order.id)}} />}</Table.Cell> */}
      </Table.Row>)
}



export default OrderItemRow
