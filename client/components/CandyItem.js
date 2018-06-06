import React from 'react'


function Quantity(){
  return (
  <form>
    <input type="number" name="quantity" />
  </form>
  )
}


export default function CandyItem(props){
  const { images, name, price, description } = props.product
  const { button, handleClick, showQuantity } = props

  return(
    <div className="singleProductContainer">
      <div className="singleProductImagesContainer">
      </div>
      <div className="singleProductHero">
        <img src={images[0]} />
        <h1>{name}</h1>
        <h4>{price}</h4>
        <p>{description}</p>
      </div>
      { button && <button onClick={handleClick} >{button}</button> }
      { showQuantity && <Quantity /> }
      <button type="button" onClick={() => props.history.push(`/admin/products/${props.product.id}/edit`)}>Edit</button>
    </div>
  )
}


