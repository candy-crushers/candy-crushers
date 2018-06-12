import React from 'react'
import AdminCategories from './categories'
import AdminUsers from './users'
import AdminProducts from './admin-products'
import { Grid, Menu, Icon } from 'semantic-ui-react'
import { Route, NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
      <div id="admin-dashboard">
        <Grid>
          <Grid.Column stretched width={12}>
            <div id="dashboard-right">
              <Route path="/admin/dashboard/products" component={AdminProducts} />
              <Route path="/admin/dashboard/categories" component={AdminCategories} />
              {/* <Route path="/admin/dashboard/orders" component={AdminOrders} /> */}
              <Route path="/admin/dashboard/users" component={AdminUsers} />
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <div id="dashboard-menu">
              <Menu fluid vertical>
                <Menu.Item as={NavLink} color="pink" to="/admin/dashboard/products"><Icon className="left" name="box" />Products</Menu.Item>
                <Menu.Item as={NavLink} color="pink" to="/admin/dashboard/categories"><Icon className="left" name="font" />Categories</Menu.Item>
                <Menu.Item as={NavLink} color="pink" to="/admin/dashboard/orders"><Icon className="left" name="ordered list" />Orders</Menu.Item>
                <Menu.Item as={NavLink} color="pink" to="/admin/dashboard/users"><Icon className="left" name="user" />Users</Menu.Item>
              </Menu>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

export default Dashboard
