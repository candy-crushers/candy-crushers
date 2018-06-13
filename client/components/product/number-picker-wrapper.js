import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addItem } from '../../store'
import { Icon, Segment, Button, Message } from 'semantic-ui-react'



class NumberPickerWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 1
    }
  }



  handleSubmit = (event) => {
    event.preventDefault()
    const quantity = this.state.quantity
    const item = {item : this.props.product, quantity}
    this.props.addToCart(item)
    this.setState({
      quantity : 1
    })
  }

  plus(event){
    event.preventDefault()
    console.log(this.props.product.inventory)
    if(this.state.quantity < this.props.product.inventory) {
      this.setState({
        quantity : this.state.quantity + 1
      })
    }
  }

  minus(event){
    event.preventDefault()
    const quantity = this.state.quantity
    if(quantity > 1){
      this.setState({
        quantity : this.state.quantity - 1
      })
    }
  }



  render(){
    const quantity = this.state.quantity
    const {inventory} = this.props.product;

    return(
      <div>
      <div className="numberPicker" >
        <p>quantity:</p>
        <Icon name='minus square' onClick={(e) => this.minus(e) }/>
          <p>{quantity}</p>
        <Icon name='plus square' onClick={(e) => this.plus(e) } disabled={quantity === inventory}/>

      </div>
        <Button size='mini' color='blue' onClick={(e) => this.handleSubmit(e)}>Add to  Cart!</Button>
        { quantity === inventory &&
        <Message negative>
          <Message.Header>{`Only ${quantity} left!`}</Message.Header>
        </Message>
        }
        </div>)

  }
}



const mapDispatch = (dispatch) => {
  return ({
    addToCart : (item) => dispatch(addItem(item))
  })
}


export default connect(null, mapDispatch)(NumberPickerWrapper);
