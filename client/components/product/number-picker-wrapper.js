import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addItem } from '../../store'
import { Icon, Segment, Button } from 'semantic-ui-react'



class NumberPickerWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 1
    }
  }

  updateQuantity = (event) => {
    event.preventDefault()
    if(event.target.value > 0){
      this.setState({
        [event.target.name] : event.target.value
      })
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
    this.setState({
      quantity : this.state.quantity + 1
    })
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
    return(
      <div>
      <Segment.Group horizontal >
        <p>qantityty:</p>
        <Icon name='minus square' onClick={(e) => this.minus(e) }/>
          <p>{quantity}</p>
        <Icon name='plus square' onClick={(e) => this.plus(e) }/>
      </Segment.Group>
        <Button size='mini' color='pink' onClick={(e) => this.handleSubmit(e)}>Add to  Cart!</Button>
        </div>)

  }
}



const mapDispatch = (dispatch) => {
  return ({
    addToCart : (item) => dispatch(addItem(item))
  })
}


export default connect(null, mapDispatch)(NumberPickerWrapper);
