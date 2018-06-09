import React, { Component } from 'react'
import { Image, Card } from 'semantic-ui-react'
import { NumberPickerWrapper } from '../'
import { Link } from 'react-router-dom'



function AllProductsCard(props){
  const { id, images, name, price, description } = props.product
  return (
  <Link to={`/products/${id}`} >
  <Card >
    <Image src={images[0]}/>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        <span className='price'>{`price: ${price}`}</span>
      </Card.Meta>
      <Card.Description>{description.substring(0, 100)}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <NumberPickerWrapper product={props.product} />
    </Card.Content>
  </Card>
  </Link>)
  }






export default AllProductsCard
