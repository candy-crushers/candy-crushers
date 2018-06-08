import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForUserThunk } from '../store';
import { OrderRow } from './'

class UserOrderHistory extends Component {

  componentDidMount () {
    this.props.getOrders()
  }

  render () {
    const { orders } = this.props
    return (
      <div className="order-history">
        <h1>Order History</h1>
        <div className="order-history-orders">
          {
            orders.length > 0 && orders.map(order => <OrderRow key={order.id} order={order} />)
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
    getOrders: () => dispatch(createGetOrdersForUserThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderHistory)
