import React from 'react'



function ChangeStatusForm(props){
  const { order, handleChange, handleEdit } = props
  return(
    <form name="status" >
    <p>{`Oder Status: ${order.status}`}</p>
      <label htmlFor="status">Update order status</label>
      <select name="status" onChange={handleChange}>
        <option>***</option>
        <option name="status" value="Created">Created</option>
        <option name="status" value="Processing">Processing</option>
        <option name="status" value="Completed">Completed</option>
        <option name="status" value="Cancelled">Cancelled</option>
        <option name="status" value="Shipped">Shipped</option>
        <option name="status" value="Delivered">Delivered</option>
      </select>
      <button type="submit" onClick={handleEdit}>Change Status</button>
    </form>)
}

export default ChangeStatusForm
