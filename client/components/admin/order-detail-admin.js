import React from 'react'
import {DisplayAmount, ChangeStatusForm} from '../'
import { Segment, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const OrderDetail = ({ order, changeStatus }) => {
  if (!order.id) return <div />
  const addrLine1Indx = order.shippingAddress.indexOf(',')
  const address = order.shippingAddress.slice(0, addrLine1Indx) + order.shippingAddress.slice(addrLine1Indx + 1)
  return (
    <div>
    <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#id</Table.HeaderCell>
        <Table.HeaderCell>Order Date</Table.HeaderCell>
        <Table.HeaderCell>Shipping Address</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>{order.id}</Table.Cell>
        <Table.Cell>{order.orderDate}</Table.Cell>
        <Table.Cell>{address}</Table.Cell>
        <Table.Cell>{order.email}</Table.Cell>
        <Table.Cell>{<DisplayAmount amount={order.subtotal} />}</Table.Cell>
        <Table.Cell>{<ChangeStatusForm status={order.status} changeStatus={changeStatus}/>}</Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table>
    <h2>Products in Order</h2>
    <Table striped>
      <Table.Header>
        <Table.Row>
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



export default OrderDetail

    {/* // <div>
    //   <div>
    //     <h3>Shipping Address</h3>
    //     <div>
    //       <p>{order.shippingAddress.slice(0, addrLine1Indx)}</p>
    //       <p>{order.shippingAddress.slice(addrLine1Indx + 1)}</p>
    //     </div>
    //   </div>
    //   <div>
    //     <h3>Order Summary</h3>
    //     <p>{order.status}</p>
    //     <p>Ordered on {order.orderDate}</p>
    //     <p>Subtotal: <DisplayAmount amount={order.subtotal} /></p>
    //   </div>
    // </div> */}
