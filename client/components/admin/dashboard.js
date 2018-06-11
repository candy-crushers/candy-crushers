import React from 'react'
import { connect } from 'react-redux'
import AdminCategories from './categories'
import AdminUsers from './users'
import { Menu } from 'semantic-ui-react'

class Dashboard extends React.Component {
  constructor(){
    super()
    this.state= {
      display: ''
    }
  }

  displayChange = (event) => {
    this.setState({display: event.target.value})
  }
  render() {
    const {display} = this.state
    return (
      <div>
        <div>
          <Menu pointing secondary>
            <Menu.Item name='Products' active={display === 'Products'} onClick={() => this.setState({display: 'Products'})} />
            <Menu.Item name='Categories' active={display === 'Categories'} onClick={() => this.setState({display: 'Categories'})} />
            <Menu.Item name='Orders' active={display === 'Orders'} onClick={() => this.setState({display: 'Orders'})} />
            <Menu.Item name='Users' active={display === 'Users'} onClick={() => this.setState({display: 'Users'})} />
          </Menu>
        </div>
        {/* {display === 'Products' && <AdminProducts />} */}
        {display === 'Categories' && <AdminCategories  />}
        {/* {display === 'Orders' && <AdminOrders  />} */}
        {display === 'Users' && <AdminUsers  />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
