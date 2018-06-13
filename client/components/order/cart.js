import React from 'react'
import {connect} from 'react-redux'
import {deleteItem, editquantity} from '../../store'
import { Link } from 'react-router-dom'
import { Container, Image, Button, Icon, Item, Table } from 'semantic-ui-react';
import { CartItem, DisplayAmount } from '../'

class Cart extends React.Component {

  changeQuantity = (event, id, diff) => {
    if (diff > 0){
      this.props.editquantity({
        id,
        quantity: diff
      });
    }
  }

  render(){
    const {cart, deleteItem, subtotal} = this.props
    return (
      <Container><br /><br />
      <h3>YOUR CART</h3>
      <Table striped >
      <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Price Each</Table.HeaderCell>
        <Table.HeaderCell>Total for Items</Table.HeaderCell>
        <Table.HeaderCell> </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
       cart.map((item) => {
         return <CartItem deleteItem={deleteItem} item={item} key={item.item.id} handleChange={this.changeQuantity} />
       })
      }
    </Table.Body>
    </Table>
        <hr /><br />
        <div className="subTotal">
        <div>
          <h2>Subtotal: <DisplayAmount amount={subtotal}/></h2>
        </div><br />
        {subtotal ? <div>
          <Link to={'/checkout'} >
            <Button animated='vertical' color="blue" size="massive">
              <Button.Content hidden>Checkout</Button.Content>
              <Button.Content visible>
                <Icon name='payment' />
              </Button.Content>
            </Button>
          </Link>
        </div> : <div></div> }
       </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const subtotal = state.cart.reduce( (total, cartItem) => {
    return (total + cartItem.item.price * cartItem.quantity)
  }, 0 )
  return {
    cart: state.cart,
    subtotal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editquantity: (item) => dispatch(editquantity(item)),
    deleteItem: (itemId) => dispatch(deleteItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
