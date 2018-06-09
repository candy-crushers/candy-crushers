import React from 'react'
import { connect } from 'react-redux'
import { ProductForm } from './'
import { createPostProductThunk } from '../store'

const AddProduct = (props) => {
  return (
    <div>
      <ProductForm updateOrCreate={props.postProduct} />
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postProduct: (product) => {
      dispatch(createPostProductThunk(product))
        .then(() => {
          ownProps.history.push(`/guest/orders/confirmation`)
        })
    }
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
