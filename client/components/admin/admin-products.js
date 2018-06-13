import React, { Component } from 'react'
import { fetchProducts } from '../../store'
import { connect } from 'react-redux'
import { AdminProductTable } from '../'
import { Header, Icon, Button } from 'semantic-ui-react'

class AdminProducts extends Component {

  componentDidMount () {
    this.props.fetchInitialProducts()
  }

  render () {
    const { products, history } = this.props
    return (
      <div>
        <div id="products-header">
          <Header color="pink" as='h1'>Products</Header>
          <Button color="blue" size="large" onClick={() => history.push('/admin/dashboard/products/add')} >Add Product</Button>
        </div>
          { products.length ? <AdminProductTable products={products} history={history} /> : <div /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
