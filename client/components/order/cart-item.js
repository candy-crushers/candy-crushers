import React, { Component } from 'react'
import { Icon, Button, Table, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {DisplayAmount} from '../'

class CartItem extends Component {
  constructor (props){
    super(props)
  }

  render(){
    const { deleteItem, handleChange } = this.props
    const { item, quantity } = this.props.item
    const subtotal = quantity * item.price
    //const index = Math.floor(Math.random() * 10)

    return(
          <Table.Row  >
            <Table.Cell >
            {<Link to={'/products/' + item.id} >
              <Header as='h4' image>
              <Image src={item.images[4]} rounded size='mini' />
              <Header.Content>
              {item.name}
              {/* <Header.Subheader>unit price {item.price}</Header.Subheader> */}
              </Header.Content>
              </Header>
            </Link>}
        </Table.Cell>

          <Table.Cell>
          <div className="cartPicker">
          <Icon name='minus square' onClick={(e) => handleChange(e, item.id, (quantity - 1)) }/>
          <p>{quantity}</p>
          <Icon name='plus square' onClick={(e) => handleChange(e, item.id, (quantity + 1)) }/>
          </div>
            </Table.Cell>
          <Table.Cell><DisplayAmount amount={item.price} /></Table.Cell>
          <Table.Cell><DisplayAmount amount={subtotal} /></Table.Cell>
          <Table.Cell><Button size="mini" color="blue" floated='right' onClick={() => deleteItem(item.id)} >Delete</Button></Table.Cell>

        </Table.Row>)

}
}

export default CartItem
