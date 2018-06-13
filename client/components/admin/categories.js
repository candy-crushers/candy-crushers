import React from 'react'
import { connect } from 'react-redux'
import {fetchCategories, addCategory, editCategory, deleteCategory} from '../../store'
import { Modal, Button, Form, Header, Table, Container} from 'semantic-ui-react'

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
        <div id="categories-header">
          <Header color="pink" as="h1">Categories</Header>
          <Modal trigger ={<Button primary>{`Add Category`}</Button>} closeIcon >
            <Modal.Header>New Category Name </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field inline >
                  <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
              </Form.Field>
              <Button primary>Add</Button>
            </Form>
          </Modal>
        </div>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {categories.length && categories.map((category) =>
            (
                <Table.Row key={category.id}>
                  <Table.Cell>
                    {category.name}
                  </Table.Cell>
                  <Table.Cell>
                    <Modal trigger ={<Button>Edit</Button>} closeIcon >
                      <Modal.Header>Edit Category Name</Modal.Header>
                      <Form onSubmit={() => this.editSubmit(category.id)} >
                        <Form.Field inline>
                          <input type="text" placeholder={category.name} ref={input => this._name = input} />
                        </Form.Field>
                        <Button primary color="pink">Edit</Button>
                      </Form>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="red" onClick={() => deleteCategory(category.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
            ))
          }
          </Table.Body>
        </Table>
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
