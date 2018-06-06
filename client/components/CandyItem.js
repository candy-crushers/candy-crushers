import React from 'react'

export default function CandyItem(props){
  const { images, name, price, description } = props.product
  const button = props.button
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
      { button && <button>{button}</button> }
    </div>
  )
}
