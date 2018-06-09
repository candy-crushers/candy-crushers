import React, { Component } from 'react'
import { createGetOrderForAdminThunk } from '../../store'
import { connect } from 'react-redux'
import { OrderDetail, OrderProductDetails } from '../order/order-detail'

class AdminSingleOrder extends Component {

  componentDidMount () {
    this.props.getOrder(this.props.match.params.id)
  }

  render () {
    const { order } = this.props
    return (
      <div>
        <h1>Order Details</h1>
        <OrderDetail order={order} />
        <OrderProductDetails products={order.products} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(createGetOrderForAdminThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleOrder)
