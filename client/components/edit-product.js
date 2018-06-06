import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductForm } from './'
import { createPutProductThunk, fetchSingleProduct } from '../store'

class EditProduct extends Component {

  componentDidMount () {
    const { getProduct, match} = this.props
    getProduct(match.params.id)
  }

  render () {
    const { product, putProduct } = this.props

    return (
      <div>
        <ProductForm product={product} updateOrCreate={putProduct} updating />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProduct: (id) => {
      dispatch(fetchSingleProduct(id))
    },
    putProduct: (product) => {
      dispatch(createPutProductThunk(product))
        .then(() => {
          ownProps.history.push(`/products/${product.id}`)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
