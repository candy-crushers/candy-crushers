import React from 'react'
import { Table, Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { DisplayAmount, EditProduct } from '../'

const AdminProductRow = ({ product, history }) => {
  const categories = product.categories.map(categoryObj => categoryObj.name).join(', ')
  return (
    <Table.Row warning={product.inventory <= 25}>
      <Table.Cell><Link to={`/products/${product.id}`}>{product.name}</Link></Table.Cell>
      <Table.Cell textAlign="right"><DisplayAmount amount={product.price} /></Table.Cell>
      <Table.Cell textAlign="right">{product.inventory}</Table.Cell>
      <Table.Cell>{categories}</Table.Cell>
      <Table.Cell textAlign="center">
       <Button compact color="pink" size="mini" onClick={() => history.push(`/admin/dashboard/products/${product.id}/edit`)}>Edit</Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default AdminProductRow
