import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForAdminThunk } from '../../store';
import { OrderRow, StatusFilterRadios } from '../'

class AdminOrderHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      filtered : false,
      categort : ''
    }
  }

  componentDidMount () {
    this.props.getOrders()
  }

  handleRadioChange = (event) => {
    event.preventDefault()

  }

  render () {
    const { orders, match } = this.props
    return (
      <div className="order-history">
        <h1>All Orders</h1>
        <StatusFilterRadios />
        <div className="order-history-orders">
          {
            orders.length > 0 && orders.map(order => <OrderRow key={order.id} order={order} path={match.path} />)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    filteredOrders: state.filteredOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(createGetOrdersForAdminThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory)
