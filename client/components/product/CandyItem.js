import React from 'react'
import { Item, Container, Button } from 'semantic-ui-react'

export default function CandyItem(props){
  const { images, name, price, description } = props.product
  const { text, method, quantity, handleChange, handleSubmit } = props.showQuantity
  const { button, handleClick, outOfStock } = props

  return(
    <Container relaxed='true'>
      <Item.Group>
      <Item>
        <Item.Image size='medium' floated='left' src={images[0]} />
          <Item.Content verticalAlign='middle' >
            <Item.Header as='h1'>{name}</Item.Header>
            <Item.Description>{description}</Item.Description><br />
              <Item.Extra>
                { button && <Button color='pink' onClick={handleClick} >{B}</Button> }
                { (text && !outOfStock) && <form onSubmit={handleSubmit} >
                    <input type="number" name="quantity" value={quantity} onChange={handleChange} />
                    <Button color='pink' size="mini" type="submit">{text}</Button>
                  </form> }
                  <p>{`price : ${price}`}</p>
              </Item.Extra>
          </Item.Content>
      </Item>
      </Item.Group>
    </Container>
  )
}
