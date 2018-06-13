import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const statusOptions = [
  {
    text: 'Created',
    value: 'Created'
  },
  {
    text: 'Processing',
    value: 'Processing'
  },
  {
    text: 'Shipped',
    value: 'Shipped'
  },
  {
    text: 'Completed',
    value: 'Completed'
  },
  {
    text: 'Cancelled',
    value: 'Cancelled'
  }
]

function ChangeStatusForm(props){
  return(
    <Dropdown defaultValue={props.status} fluid selection options={statusOptions} onChange={(e, data)=> props.changeStatus(e,data)}/>
  )
}

export default ChangeStatusForm



