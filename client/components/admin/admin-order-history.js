import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForAdminThunk } from '../../store';
import { OrderRow } from '../'

class AdminOrderHistory extends Component {

  componentDidMount () {
    this.props.getOrders()
  }

  render () {
    const { orders, match } = this.props
    return (
      <div className="order-history">
        <h1>All Orders</h1>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(createGetOrdersForAdminThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory)
