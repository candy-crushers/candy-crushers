import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class Products extends React.Component {

  componentDidMount(){
    this.props.fetchInitialProducts()
  }

  render(){
    const {products} = this.props.products;
    return (
      <div>
        <h3>ALL PRODUCTS</h3>
        <Link to="/admin/products/add">Add Product</Link>
        {products.map(product =>
          (
          <div key={product.id}>
            <img src={product.images[0]} />
            <h4>{product.name}</h4>
            <h5>${product.price}</h5>
            <p>{product.description}</p>
            <a> Add To Cart </a>
          </div>
          ))
      }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    products: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
