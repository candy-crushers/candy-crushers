import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersForUserThunk } from '../../store';
import { OrderRow, OrderDetailUser } from '../'
import { Container, Segment } from 'semantic-ui-react'



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
              <div key={order.id}><br />
               <Segment><OrderDetailUser order={order} hasLink={true}/></Segment>
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
