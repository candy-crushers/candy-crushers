import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Products, SingleProduct, AddProduct, EditProduct, AdminOrderHistory, AdminSingleOrder, UserOrderHistory, UserSingleOrder, Cart, StripeCheckout, Dashboard, Confirmation} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin, isUser} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/products/:id" component={SingleProduct} />
        <Route exact path="/products" component={Products} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/cart' component={Cart} />
        <Route exact path='/checkout' component={StripeCheckout} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {
              isUser &&
              <Switch>
                <Route exact path="/orders" component={UserOrderHistory} />
                <Route path="/orders/:id" component={UserSingleOrder} />
                <Route path="/account" render={() => <div>Hi</div>} />
                <Redirect to="/products" />
              </Switch>
            }
            {
              isAdmin &&
              <Switch>
                {/* Routes placed here are only available for logged in admins */}
                <Route path="/admin/dashboard" component={Dashboard} />
              </Switch>
            }
          </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.id && state.user.isAdmin,
    isUser: !!state.user.id && !state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
