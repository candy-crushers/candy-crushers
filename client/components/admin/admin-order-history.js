import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForAdminThunk } from '../../store';
import { OrderRow, StatusFilterRadios } from '../'

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
      <div className="order-history">
        <h1>All Orders</h1>
        <StatusFilterRadios handleChange={this.handleRadioChange} checked={this.state.filter}/>
        <div className="order-history-orders">
          {
            filteredOrders.length ? filteredOrders.map(order => <OrderRow key={order.id} order={order} path={match.path} />)
            : <p>there are no orders that match this filter</p>
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
