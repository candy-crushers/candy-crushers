import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForUserThunk } from '../../store';
import { OrderRow } from '../'
import OrderDetailUser from '../order/order-detail';
import { Segment, Container } from 'semantic-ui-react'

class UserOrderHistory extends Component {

  componentDidMount () {
    this.props.getOrders()
  }

  render () {
    const { orders } = this.props
    return (
      <div>
        <Container><br /><br />
        <h1>My Order History</h1><br />
        <div>
          {
            orders.length > 0 && orders.map(order => <div key={order.id}><Segment><OrderDetailUser key={order.id} order={order} /></Segment><br /><br /></div>)
          }
        </div>
        </Container>
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
