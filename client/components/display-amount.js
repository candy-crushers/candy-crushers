import React from 'react'

const Price = (props) => {
  return(
    <span>${(props.amount/100).toFixed(2)}</span>
  )
}

export default Price
