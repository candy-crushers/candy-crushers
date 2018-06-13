import React from 'react'
import {DisplayAmount} from '../'
<<<<<<< HEAD
import { Table, Header, Image, Grid, Menu } from 'semantic-ui-react'
=======
import { Table } from 'semantic-ui-react'
>>>>>>> 363112343f210402572c76b2da1f8668b7cf2c14
import { Link } from 'react-router-dom'


function OrderDetailUser({ order }){
  if (!order.id) return <div />
  const addrLine1Indx = order.shippingAddress.indexOf(',')
  const address = order.shippingAddress.slice(0, addrLine1Indx) + order.shippingAddress.slice(addrLine1Indx + 1)
  return (
    <div>
<<<<<<< HEAD
      <Menu text fluid vertical>
          <Menu.Item className='header'>Order Number:</Menu.Item>
          <Menu.Item>{order.id}</Menu.Item>
      </Menu>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Menu text fluid vertical>
              <Menu.Item className='header'>Order Date:</Menu.Item>
              <Menu.Item>{order.orderDate}</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Menu text fluid vertical>
              <Menu.Item className='header'>Shipped To:</Menu.Item>
              <Menu.Item>{address}</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Menu text fluid vertical floated="right">
              <Menu.Item className='header'>Oder Total:</Menu.Item>
              <Menu.Item><DisplayAmount amount={order.subtotal} /></Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table striped>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell >Price</Table.HeaderCell>
            <Table.HeaderCell >Subtotal</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {
          order.products.map((product) =>{
            return (<Table.Row key={product.id}>
            <Table.Cell>
            <Header as='h4' image>
            <Image src={product.images[7]} rounded size='mini' />
            </Header>
            </Table.Cell>
=======
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
>>>>>>> 363112343f210402572c76b2da1f8668b7cf2c14
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




