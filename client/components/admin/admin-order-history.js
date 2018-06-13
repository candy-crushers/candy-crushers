import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForAdminThunk, createEditOrderForAdminThunk } from '../../store';
import {Table, Header, Container, Segment} from 'semantic-ui-react'
import { OrderRow, StatusFilterRadios, OrderItemRow, ChangeStatusForm } from '../'

class AdminOrderHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter : 'all'
    }
  }

  componentDidMount () {
    this.props.getOrders()
  }


  handleEdit = (event, data, id) => {
    this.props.updateOrderStatus(id, {status: data} )
  }

  handleRadioChange = (event) => {
    const filter = event.target.value
    this.setState({ filter })
  }

  filterOrders = (orders) => {
    if(this.state.filter === 'all'){
      return orders
    }else{
      return orders.filter(order => order.status === this.state.filter)
  }
}

  render () {
    const { orders, match } = this.props
    const filteredOrders = this.filterOrders(orders)
    return (
      <Container>
      <div className="order-history"><br />
        <h1>All Orders</h1>
        <StatusFilterRadios handleChange={this.handleRadioChange} checked={this.state.filter}/>
        <Container><br />
          <Table striped >
            <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order#</Table.HeaderCell>
              <Table.HeaderCell>#Products</Table.HeaderCell>
              <Table.HeaderCell>Subtotal</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            filteredOrders.length ?
            filteredOrders.map(order => <OrderItemRow key={order.id} order={order} changeStatus={this.handleEdit}/>)
            : <Table.Row><Table.HeaderCell><br />No orders match this status</Table.HeaderCell></Table.Row>
          }
         </Table.Body>
        </Table>
      </Container>
      </div>
      </Container>)
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(createGetOrdersForAdminThunk()),
    updateOrderStatus: (id, status) => {
      dispatch(createEditOrderForAdminThunk(id, status))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory)
