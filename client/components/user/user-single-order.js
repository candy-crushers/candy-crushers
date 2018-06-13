import React, { Component } from 'react'
import { createGetOrderForUserThunk } from '../../store'
import { connect } from 'react-redux'
import { OrderProductDetails } from '../'
import { OrderDetail } from '../'
import { Container, Segment } from 'semantic-ui-react'

class UserSingleOrder extends Component {

  componentDidMount () {
    this.props.getOrder(this.props.match.params.id)
  }

  render () {
    const { order } = this.props
    return (
      <div><br /><br />
        <Container>
          <h1>Order Details</h1>
            <Segment>
            <Container>
              <OrderDetail order={order} />
              <OrderProductDetails products={order.products} />
              </Container>
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
    getOrder: (id) => dispatch(createGetOrderForUserThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSingleOrder)
