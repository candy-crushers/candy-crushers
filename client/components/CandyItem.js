import React from 'react'

export default function CandyItem(props){
  const { images, name, price, description } = props.product
  const { text, method, quantity, handleChange, handleSubmit } = props.showQuantity
  const { button, handleClick } = props


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
      { text &&  <form onSubmit={(e)=> handleSubmit(e)}>
          <input type="number" name="quantity" value={quantity} onChange={(e) => handleChange(e)} />
          <button type="submit" >{text}</button>
        </form> }
    </div>
  )
}



