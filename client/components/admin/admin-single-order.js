import React, { Component } from 'react'
import { createGetOrderForAdminThunk, createEditOrderForAdminThunk } from '../../store'
import { connect } from 'react-redux'
import { OrderDetailAdmin, OrderProductDetails, ChangeStatusForm } from '../'
import { Container, Segment } from 'semantic-ui-react'

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


  handleChange = async(event) => {
    await this.setState({
      status : event.target.value,
    })
  }

  handleEdit = (event, data) => {
    this.props.updateOrderStatus(this.props.match.params.id, {status: data.value} )
  }

  render () {
    const { order } = this.props
    return (
      <div>
        <Container><br /><br />
        <Segment>
        <h1>Order #{order.id} Details</h1>
        <OrderDetailAdmin order={order} changeStatus={this.handleEdit} />
        </Segment>
        </Container>
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
    updateOrderStatus: (id, status) => {
      dispatch(createEditOrderForAdminThunk(id, status))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleOrder)
