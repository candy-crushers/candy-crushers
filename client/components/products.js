import React from 'react'
import {connect} from 'react-redux'
<<<<<<< HEAD
import {fetchProducts, fetchCategories, setCategory} from '../store'
=======
import { Link } from 'react-router-dom'
import {fetchProducts, fetchCategories} from '../store'
>>>>>>> master
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
    if(this.props.selectedCategory.id)
      this.setState({
        showProducts: this.filterProducts(this.props.selectedCategory.id)
      })
    else
      this.setState({
        showProducts: this.props.products
      })
  }

  filterProducts = (categoryId) => {
    return this.props.products.filter(product =>
      !!product.categories.filter( category => category.id === Number(categoryId)).length
    );
  }

  handleChange = async (event) => {
    const activeCategory = this.props.categories.filter(category => category.id === Number(event.target.value))[0]
    if(activeCategory) {
      await this.props.setCategory(activeCategory)
      const showProducts = this.filterProducts(this.props.selectedCategory.id)
      this.setState({
        showProducts
      })
    } else
      this.setState({
        showProducts: this.props.products
      })
  }

  handleSearch = (event) => {
    if(event.target.value) {
      const showProducts = this.state.showProducts.filter(product =>
        product.name.startsWith(event.target.value)
      )
      this.setState({
        showProducts
      })
    } else {
      const showProducts = this.filterProducts(this.props.selectedCategory.id)
      this.setState({
        showProducts: showProducts.length ? showProducts:  this.props.products
      })
    }
  }

  render(){
    console.log(this.props);
    const {categories,selectedCategory} = this.props;
    const products = this.state.showProducts;
    return (
      <Container >
        <h3>ALL PRODUCTS</h3>
<<<<<<< HEAD
        <select onChange={this.handleChange} value={selectedCategory.id}>
          <option value={null}>Select Category</option>
=======
        <Link to="/admin/products/add">Add Product</Link>
        <select onChange={this.handleChange}>
          <option>Select Category</option>
>>>>>>> master
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
    products: state.products.products,
    selectedCategory: state.products.selectedCategory,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialCategories: () => dispatch(fetchCategories()),
    setCategory: (category) => dispatch(setCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
