import React, { Component } from 'react'
import { Item, Container, Button } from 'semantic-ui-react'
import MultiPhotoDisplay from './multi-photo-display'
import {DisplayAmount} from '../'



class CandyItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected : 0
    }
  }


  changeSelectedPhoto = (index) => {
    this.setState({
      selected : index
    })
  }

    render (){
      const { images, name, price, description } = this.props.product
      const { text, quantity, handleChange, handleSubmit } = this.props.showQuantity
      const { button, handleClick, outOfStock, multi } = this.props
      const multiContent = {
        selected : this.state.selected,
        changeSelected : this.changeSelectedPhoto,
      }
     return(
      <Container relaxed='true'><br /><br />
      <div className="marginCandyItem">
        <Item.Group>
        <Item>
          <div>
          <Item.Image size='medium' floated='left' src={images[this.state.selected]} />
          <Item.Extra>
          <MultiPhotoDisplay multi={multiContent} photos={images}/>
          </Item.Extra>
          </div>
            <Item.Content verticalAlign='middle' >
              <Item.Header as='h1'>{name}</Item.Header>
              <Item.Description>{description}</Item.Description><br /><br />
                <Item.Extra>
                    <p>{`price : ${price}`}</p><br />
                  { button && <Button color='pink' onClick={handleClick} >{B}</Button> }
                  { (text && !outOfStock) && <form onSubmit={handleSubmit} >
                      <input type="number" name="quantity" value={quantity} onChange={handleChange} /><br /><br />
                      <Button color='blue' size="mini" type="submit">{text}</Button>
                    </form> }
                    <p>price : <DisplayAmount amount={price} /></p>
                </Item.Extra>
            </Item.Content>
        </Item>
        </Item.Group>
        </div>
      </Container>
    )

  }
}

export default CandyItem
