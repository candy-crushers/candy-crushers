import React from 'react'
import { connect } from 'react-redux'
import { ProductForm } from './product-form'
import { createPostProductThunk } from '../../store'

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
        .then((newProductId) => {
          ownProps.history.push(`/products/${newProductId}`)
        })
    }
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
