import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchCategories} from '../store'
import {Container, Image, Segment} from 'semantic-ui-react'

/**
 * COMPONENT
 */
class Products extends React.Component {
  constructor(){
    super()
    this.state = {
      showProducts: []
    }
  }

  async componentDidMount(){
    await this.props.fetchInitialProducts()
    this.props.fetchInitialCategories()
    this.setState({
      showProducts: this.props.products
    })
  }

  handleChange = (event) => {
    const showProducts = this.props.products.filter(product =>
      !!product.categories.filter( category => category.id === Number(event.target.value)).length
    );
    this.setState({
      showProducts
    })
  }

  handleSearch = (event) => {
    if(event.target.value) {
      const showProducts = this.props.products.filter(product =>
        product.name.startsWith(event.target.value)
      )
      this.setState({
        showProducts
      })
    } else {
      this.setState({
        showProducts: this.props.products
      })
    }
  }

  render(){
    const {categories} = this.props;
    const products = this.state.showProducts;
    return (
      <Container >
        <h3>ALL PRODUCTS</h3>
        <select onChange={this.handleChange}>
          <option>Select Category</option>
          {categories.map( category =>
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )}
        </select>
        <form onChange={this.handleSearch}>
          <label>Search: </label>
          <input
           type="text"
           onChange={this.handleChange}
          />
        </form>
        {products.length && products.map( (product) =>
        (
          <div key={product.id}>
              <Image src={product.images[0]} size='small' />
              <h4>{product.name}</h4>
              <h5>${product.price}</h5>
              <Segment basic>{product.description.substring(0, 100)}...</Segment>
              <a>Add To Cart</a>
          </div>
        ))
      }
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
