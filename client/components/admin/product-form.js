import React, { Component } from 'react'
import { Form, Button, Popup, Dropdown, Message } from 'semantic-ui-react'

class ProductForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      description: '',
      price: 1.00,
      inventory: 1,
      images: '',
      selectedCategories: [],
      errorMsg: '',
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.product && nextProps.product.id) {
      const selectedCategories = nextProps.product.categories.map( category => category.id);
      const product = {...nextProps.product, selectedCategories}
      product.price = Number((product.price / 100).toFixed(2))
      this.setState(product)
    }
  }

  handleCategories = (event, {value}) => {
    this.setState({
      selectedCategories: value
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {errorMsg, ...product} = this.state
    // if none are supplied, delete the image so the default picture will be supplied
    if (!product.images) delete product.images
    if (this.state.selectedCategories.length === 0) {
      this.setState({
        errorMsg: 'At least one category must be added'
      })
    } else {
      this.props.updateOrCreate(product)
    }
  }

  render () {
    return (
      <div id="add-product">
        <h1>{this.props.updating ? 'Edit Product' : 'Add a New Product'}</h1>
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Form.Field>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} required />
          </Form.Field>
          <Form.Field>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="7" value={this.state.description} required />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="price">Price</label>
              <input type="number" min="0.00" step="0.01" name="price" value={this.state.price} onChange={() => {}} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="inventory">Inventory</label>
              <input type="number" min="0" step="1" name="inventory" value={this.state.inventory} required onChange={() => {}} />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label htmlFor="images">Images</label>
            <Popup
              trigger={<input type="text" name="images" value={this.state.images} />}
              content='Multiple image locations must be separated by a comma'
              on='focus'
              position='top right'
              size="mini"
              flowing
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="categories">Categories</label>
            <Dropdown
              value={this.state.selectedCategories}
              placeholder='Select Category'
              onChange={this.handleCategories}
              fluid
              multiple
              selection
              options={this.props.categories && this.props.categories.map(category => ({text: category.name, value: category.id}) ) }
            />
          </Form.Field>
          {this.state.errorMsg && (
            <Message negative>{this.state.errorMsg}</Message>
          )}
          <Button type="submit" positive floated="right">{this.props.updating ? 'Save Changes' : 'Add Product'}</Button>
        </Form>
      </div>
    )
  }

}

export default ProductForm
