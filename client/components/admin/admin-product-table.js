import React from 'react'
import { Table } from 'semantic-ui-react'
import { AdminProductRow } from '../'

const AdminProductTable = (props) => {
  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Inventory</Table.HeaderCell>
          <Table.HeaderCell>Categories</Table.HeaderCell>
          <Table.HeaderCell>Action(s)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          props.products.map(product => (
            <AdminProductRow key={product.id} product={product} history={props.history} />
          ))
        }
      </Table.Body>
    </Table>
  )
}

export default AdminProductTable
