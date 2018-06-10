import React, { Component } from 'react'
import { createGetOrderForAdminThunk, createEditOrderForAdminThunk } from '../../store'
import { connect } from 'react-redux'
import { OrderDetail, OrderProductDetails, ChangeStatusForm } from '../'

class AdminSingleOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      status : ''
    }
  }

  componentDidMount () {
    this.props.getOrder(this.props.match.params.id)
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     status : nextProps.order.status
  //   })
  //   console.log('next', this.state.status)
  // }

  handleChange = async(event) => {
    await this.setState({
      status : event.target.value,
    })
    //console.log('state', this.state)
  }

  handleEdit = (event) => {
    event.preventDefault()
    console.log('here', )
    this.props.updateOrderStatus(this.props.match.params.id, {status : this.state.status })
  }

  render () {
    const { order } = this.props
    console.log('detail', order)
    return (
      <div>
        <h1>Order Details</h1>
        <ChangeStatusForm
          order={order}
          status={this.state.status}
          handleChange={this.handleChange}
          handleEdit={this.handleEdit}
          // handleDelete={this.handleDelete}
          />
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
    getOrder: (id) => dispatch(createGetOrderForAdminThunk(id)),
    updateOrderStatus: (id, status) => dispatch(createEditOrderForAdminThunk(id, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleOrder)
