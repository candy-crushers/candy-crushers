import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersThunk } from '../store';
import { OrderRow } from './'

class OrderHistory extends Component {

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
            /* REVIEW: is this check neccessary? */
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
    getOrders: () => dispatch(createGetOrdersThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
