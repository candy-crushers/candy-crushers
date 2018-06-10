import React from 'react'
import { connect } from 'react-redux'
import {fetchCategories, addCategory, editCategory, deleteCategory} from '../../store'
import { Modal, Button, Form} from 'semantic-ui-react'

class AdminCategories extends React.Component {
  constructor(){
    super()
    this.state={
      name: ''
    }
  }
  async componentDidMount(){
    await this.props.fetchInitialCategories()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addCategory(this.state.name);
  }

  editSubmit = (categoryId) => {
    this.props.editCategory({id: categoryId, name: this._name.value})
  }

  render() {
    const {categories, deleteCategory} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label htmlFor='name'>Category Name:</label>
            <input type="text" name="name" value={this.state.name}/>
          <button type="submit">Add</button>
        </form>
        {categories.length && categories.map((category) =>
          (
            <div key={category.id}>
              <div>
               {category.name}
              </div>
              <Modal trigger ={<Button>Edit</Button>} closeIcon >
                <Modal.Header>Edit Category</Modal.Header>
                <Form onSubmit={() => this.editSubmit(category.id)} >
                  <Form.Field>
                    <label>Category Name</label>
                    <input type="text" placeholder={category.name} ref={input => this._name = input} />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
              </Modal>
              <div>
                <button type="button" onClick={() => deleteCategory(category.id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialCategories: () => dispatch(fetchCategories()),
    addCategory: (categoryName) => dispatch( addCategory(categoryName)),
    editCategory: (category) => dispatch( editCategory(category)),
    deleteCategory: (categoryId) => dispatch( deleteCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories)
