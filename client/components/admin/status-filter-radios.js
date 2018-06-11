import React, { Component } from 'react'

function StatusFilterRadios(props){
  const { handleChange, checked } = props
  return (
      <form>
        <p>Filter orders by status:</p>
        <div>
          <input type="radio" value="all" checked={checked === "all"}  onChange={handleChange}/>
          <label htmlFor="all">all</label>

          <input type="radio" value="Created" checked={checked === "Created"}  onChange={handleChange}/>
          <label htmlFor="Created">Created</label>

          <input type="radio" value="Processing" checked={checked === "Processing"} onChange={handleChange}/>
          <label htmlFor="Processing">Processing</label>

          <input type="radio" value="Completed" checked={checked === "Completed"} onChange={handleChange}/>
          <label htmlFor="Completed">Completed</label>

          <input type="radio" value="Cancelled"checked={checked === "Cancelled"} onChange={handleChange} />
          <label htmlFor="Cancelled">Cancelled</label>

          <input type="radio" value="Shipped" checked={checked === "Shipped"} onChange={handleChange} />
          <label htmlFor="Shipped">Shipped</label>

          <input type="radio" value="Delivered" checked={checked === "Delivered"} onChange={handleChange} />
          <label htmlFor="Delivered">Delivered</label>
        </div>
      </form>)
}

export default StatusFilterRadios
