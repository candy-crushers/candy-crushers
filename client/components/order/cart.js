import React from 'react'
import {connect} from 'react-redux'
import {deleteItem, editquantity} from '../../store'
import { Link } from 'react-router-dom'
import { Container, Image, Button, Icon } from 'semantic-ui-react';

class Cart extends React.Component {

  changeQuantity = (event, id) => {
    event.preventDefault()
    if(event.target.value > 0){
      this.props.editquantity({
        id,
        quantity: event.target.value
      });
    }
  }

  render(){
    const {cart, deleteItem, subtotal} = this.props
    return (
      <Container>
        <h3>CART</h3>
        {cart.length ? cart.map( cartItem =>
          (
            <div key={cartItem.item.id}>
                <Image src={cartItem.item.images[0]} size='small' />
                <Link to={'/products/' + cartItem.item.id} >
                  {cartItem.item.name}
                </Link>
                <h5>${cartItem.item.price}</h5>
                <form>
                  <input type="number" name="quantity" value={cartItem.quantity} onChange={(event) => this.changeQuantity(event, cartItem.item.id)} />
                </form>
                <button
                  type='button'
                  onClick={() => deleteItem(cartItem.item.id)}
                >
                Delete
                </button>
            </div>
          )) : <div>Cart is Empty :(</div>
        }
        <hr />
        <div>
          Subtotal: ${subtotal}
        </div>
        <div>
          <Link to={'/checkout'} >
            <Button animated='vertical'>
              <Button.Content hidden>Checkout</Button.Content>
              <Button.Content visible>
                <Icon name='payment' />
              </Button.Content>
            </Button>
          </Link>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const calculatesubtotal = () => {
    return state.cart.reduce( (subtotal, cartItem) => subtotal +
    Number((cartItem.item.price * cartItem.quantity) * 100).toFixed(0) / 100
    , 0 )
  }
  return {
    cart: state.cart,
    subtotal: calculatesubtotal()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editquantity: (item) => dispatch(editquantity(item)),
    deleteItem: (itemId) => dispatch(deleteItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
