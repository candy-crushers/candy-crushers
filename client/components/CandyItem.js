import React from 'react'

export const CandyItem = (props) => {
  const { image, name, price, description } = props.product
  const button = props.button
  return(
    <div className="singleProductContainer">
      <div className="singleProductImagesContainer">
        <img src={image} />
      </div>
      <div className="singleProductHero">
        <h1>{name}</h1>
        <h4>{price}</h4>
        <p>{description}</p>
      </div>
      { button && <button>{button}</button> }
    </div>
  )
}
