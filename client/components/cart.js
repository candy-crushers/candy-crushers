import React from 'react'
import {connect} from 'react-redux'
import {deleteItem, editquantity} from '../store'
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
    return state.cart.reduce( (subtotal, cartItem) => subtotal + cartItem.item.price * cartItem.quantity, 0 )
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


// add item to cart

// update candy item to accept more optional props
// -click on add button either in all products or single product
// -with the add to cart
// -also a quantity field

// cart reducer
// -add action
// -cart = []
//   -of objects with product object and quantity


// component did mount in routes component
//   -add simple storage component that will watch for:
//     -adding an item fires the event of changeing local storage
//     -it will add an event to componentWillUnmount that will save the cart store,
//     user id and/or session id to local storage
//     to local storage when the person leaves the page
//   -check for local storage, if it exists then update store with items
//   -if not do nothing


// add to cart click handler
//   -places the item on local storage
//   -adding a new cart or adds adds items to existing cart based on if there is an existing cart
//   -trigger the cart icon to update
//    -update count and trigger 'checkout' button if there is none

// cart component
//  -view items in cart
//  -with prices and totals
//  -quantity
//  -have a checkout button








// add item to cart

// update candy item to accept more optional props
// -click on add button either in all products or single product
// -with the add to cart
// -also a quantity field

// cart reducer
// -add action
// -cart = []
//   -of objects with product object and quantity


// component did mount in routes component
//   -add simple storage component that will watch for:
//     -adding an item fires the event of changeing local storage
//     -it will add an event to componentWillUnmount that will save the cart store,
//     user id and/or session id to local storage
//     to local storage when the person leaves the page
//   -check for local storage, if it exists then update store with items
//   -if not do nothing


// add to cart click handler
//   -places the item on local storage
//   -adding a new cart or adds adds items to existing cart based on if there is an existing cart
//   -trigger the cart icon to update
//    -update count and trigger 'checkout' button if there is none

// cart component
//  -view items in cart
//  -with prices and totals
//  -quantity
//  -have a checkout button








