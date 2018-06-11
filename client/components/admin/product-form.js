import React, { Component } from 'react'
import { Form, Button, Popup } from 'semantic-ui-react'

class ProductForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventory: 0,
      images: '',
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.product && nextProps.product.id) {
      this.setState(nextProps.product)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {...product} = this.state
    // if none are supplied, delete the image so the default picture will be supplied
    if (!product.images) delete product.images

    this.props.updateOrCreate(product)
  }

  render () {
    return (
      <div id="add-product">
        <h1>{this.props.updating ? 'Edit Product' : 'Add a New Product'}</h1>
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Form.Field>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="7" value={this.state.description} />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="price">Price</label>
              <input type="number" min="0.00" step="0.01" name="price" value={this.state.price} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="inventory">Inventory</label>
              <input type="number" min="0" step="1" name="inventory" value={this.state.inventory} />
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
          <Button type="submit" positive floated="right">{this.props.updating ? 'Save Changes' : 'Add Product'}</Button>
        </Form>
      </div>
    )
  }

}

export default ProductForm
