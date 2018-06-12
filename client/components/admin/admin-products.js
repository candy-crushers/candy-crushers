import React, { Component } from 'react'
import { fetchCategories } from '../../store'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class AdminProducts extends Component {

  render () {
    return (
      <div>
        <Link to="/admin/products/add" >
          Add Product
        </Link>
      </div>
    )
  }
}


export default connect(null)(AdminProducts)
