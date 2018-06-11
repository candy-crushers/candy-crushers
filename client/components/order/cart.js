import React from 'react'
import {connect} from 'react-redux'
import {deleteItem, editquantity} from '../../store'
import { Link } from 'react-router-dom'
import { Container, Image, Button, Icon, Item, Table } from 'semantic-ui-react';
import { CartItem } from '../'

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
         return <CartItem deleteItem={deleteItem} item={item} key={item.id}/>
       })
      }
    </Table.Body>
    </Table>
        <hr /><br />
        <div className="subTotal">
        <div>
          <h2>Subtotal: ${subtotal}</h2>
        </div><br />


        {subtotal ? <div>
          <Link to={'/checkout'} >
            <Button animated='vertical' color="teal" size="massive">
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
  const calculatesubtotal = () => {
    return state.cart.reduce( (subtotal, cartItem) => subtotal +
    (Number(cartItem.item.price) * cartItem.quantity * 100).toFixed(0) / 100
    , 0 )
  }
  return {
    cart: state.cart,
    subtotal: calculatesubtotal(),

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editquantity: (item) => dispatch(editquantity(item)),
    deleteItem: (itemId) => dispatch(deleteItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)


  {/* <Image src={cartItem.item.images[0]} size='small' />
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
                </button> */}



                // <Container>
                // <div className="cartItemContainer">
                //   <Item.Group>
                //   {cart.length ? cart.map( cartItem =>
                //     (
                //       <div key={cartItem.item.id} className="cartItemWrapper">
                //         <CartItem item={cartItem} deleteItem={deleteItem}/>
                //       </div>
                //     )) : <div>Cart is Empty :(</div>
                //   }
                //   </Item.Group>
                //   </div>
