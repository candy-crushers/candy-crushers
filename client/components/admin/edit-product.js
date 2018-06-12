import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductForm } from '../'
import { createPutProductThunk, fetchSingleProduct, fetchCategories } from '../../store'

class EditProduct extends Component {

  componentDidMount () {
    const { getProduct, match} = this.props
    getProduct(match.params.id)
    this.props.fetchCategories()
  }

  render () {
    const { product, putProduct, categories } = this.props

    return (
      <div>
        <ProductForm product={product} updateOrCreate={putProduct} updating categories={categories} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
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
