import React, { Component } from 'react'
import { createGetOrderForUserThunk } from '../../store'
import { connect } from 'react-redux'
import { OrderProductDetails } from '../'
import { OrderDetail } from '../'

class UserSingleOrder extends Component {

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
    getOrder: (id) => dispatch(createGetOrderForUserThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSingleOrder)
