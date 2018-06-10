import React from 'react'



function ChangeStatusForm(props){
  const { order, handleChange, handleEdit, handleDelete } = props
  return(
    <form name="status" >
    <p>{`Oder Status: ${order.status}`}</p>
      <label htmlFor="status">Update order status</label>
      <select name="status" onChange={(e)=> handleChange(e)}>
        <option>***</option>
        <option name="status" value="Created">Created</option>
        <option name="status" value="Processing">Processing</option>
        <option name="status" value="Completed">Completed</option>
        <option name="status" value="Cancelled">Cancelled</option>
      </select>
      {/* <Button onClick={(e)=> handleDelete(e)}>Delete Order</Button> */}
      <button type="submit" onClick={(e)=> handleEdit(e)}>Change Status</button>
    </form>)
}

export default ChangeStatusForm
