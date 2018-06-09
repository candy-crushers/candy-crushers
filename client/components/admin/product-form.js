import React, { Component } from 'react'

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
      <div>
        <h1>{this.props.updating ? 'Edit Product' : 'Add a New Product'}</h1>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="5" value={this.state.description} />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number" min="0.00" step="0.01" name="price" value={this.state.price} />
          </div>
          <div>
            <label htmlFor="inventory">Inventory</label>
            <input type="number" min="0" step="1" name="inventory" value={this.state.inventory} />
          </div>
          <div>
            <label htmlFor="images">Images</label>
            <input type="text" name="images" value={this.state.images} />
            <span>Multiple image locations must be separated by a comma</span>
          </div>
          <button type="submit">{this.props.updating ? 'Save Changes' : 'Add Product'}</button>
        </form>
      </div>
    )
  }

}

export default ProductForm
