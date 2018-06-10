import React, { Component } from 'react'
import { connect } from 'react-redux'



function StatusFilterRadios(props){
  const { handleChange } = props
  return (
      <form onChange={(e)=> handleChange(e)}>
        <p>Filter orders by status:</p>
        <div>
          <input type="radio" name="status" value="all" />
          <label htmlFor="all">all</label>

          <input type="radio" name="status" value="Created" />
          <label htmlFor="Created">Created</label>

          <input type="radio" name="status" value="Processing" />
          <label htmlFor="Processing">Processing</label>

          <input type="radio" name="status" value="Completed" />
          <label htmlFor="Completed">Completed</label>

          <input type="radio" name="status" value="Cancelled" />
          <label htmlFor="Cancelled">Cancelled</label>
        </div>
      </form>)
}

export default StatusFilterRadios
