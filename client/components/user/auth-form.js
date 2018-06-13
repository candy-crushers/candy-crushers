import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, changePasswordThunk} from '../../store'
import { Form, Button, Icon, Segment, Divider, Modal } from 'semantic-ui-react'

/**
 * COMPONENT
 */
//const AuthForm = (props) => {
class AuthForm extends React.Component {
  constructor(){
    super()
    this.state={
      email: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  updatePassword = async (email) => {
    await this.props.changePassword({email, password: this._password.value, isVerified: true})
  }

  render(){
    const {name, displayName, handleSubmit, error} = this.props
    return (
      <Segment padded id="auth-form">
        <Form onSubmit={handleSubmit} name={name}>
          <Form.Field>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" required onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" required />
          </Form.Field>
          {error && error.response && <div> {error.response.data} </div>}
          {error && error.response.data==='Password has expired. Reset Password' &&

              <Modal trigger={<Button>Update Password</Button>} >
                <div id="reset-password">
                <Modal.Header>Update Password</Modal.Header>
                <Form>
                  <br />
                  <Form.Field>
                    <label>Email: </label>
                    <input type='text' placeholder={this.state.email} readOnly/>
                  </Form.Field>
                  <Form.Field>
                    <label>New Password: </label>
                    <input type="password" ref={input => this._password = input} />
                  </Form.Field>
                  <Button onClick={() => this.updatePassword(this.state.email)}>Update</Button>
                </Form>
                </div>
              </Modal>
          }
          <div className="auth-buttons">
          <Button primary type="submit">{displayName}</Button>
            <Divider horizontal>Or</Divider>
            <a href="/auth/google">
              <Button color="google plus" type="button" >
                <Icon name="google" />
                {displayName} with Google
              </Button>
            </a>
          </div>
        </Form>
      </Segment>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
    changePassword: (user) => dispatch(changePasswordThunk(user))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
