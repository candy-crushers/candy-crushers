import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForUserThunk } from '../../store';
import { OrderRow, OrderDetailUser } from '../'
import { Container, Segment } from 'semantic-ui-react'

>>>>>>> 363112343f210402572c76b2da1f8668b7cf2c14

class UserOrderHistory extends Component {

  componentDidMount () {
    this.props.getOrders()
  }

  render () {
    const { orders } = this.props
    return (
      <div>
        <Container>
        <br />
        <h1>My Order History</h1>
        <div>
          {
            orders.length > 0 && orders.map(order =>
              <div><br />
               <Segment inverted color='blue' tertiary><OrderDetailUser key={order.id} order={order} /></Segment>
               </div>)
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
