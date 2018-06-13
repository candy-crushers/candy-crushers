import React from 'react'
import { connect } from 'react-redux'
import { ProductForm } from '../'
import { createPostProductThunk, fetchCategories } from '../../store'

class AddProduct extends React.Component {
  componentDidMount(){
    this.props.fetchCategories()
  }

  render() {
    return (
      <div>
        <ProductForm updateOrCreate={this.props.postProduct} categories={this.props.categories}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    postProduct: (product) => {
      dispatch(createPostProductThunk(product))
        .then(() => {
          ownProps.history.push(`/admin/dashboard/products`)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
