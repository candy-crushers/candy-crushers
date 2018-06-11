import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changePasswordThunk} from '../../store'
import {Modal, Form, Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {

  updatePassword = async (email) => {
    await this.props.changePassword({email, password: this._password.value})
  }

  render() {
    const {user} = this.props
    return (
      <div>
        {user.isVerified ? <h3>Welcome, {user.email}</h3> :
          <div>
            <h3> Your password has expired </h3>
            <Modal trigger={<Button>Update Password</Button>} >
              <Modal.Header>Update Password</Modal.Header>
              <Form onSubmit={() => this.updatePassword(user.email)} >
                <Form.Input fluid label='email' placeholder={user.email} readOnly />
                <Form.Field>
                  <label>New Password: </label>
                  <input type="text" ref={input => this._password = input} />
                </Form.Field>
                <Button type='submit'>Update</Button>
              </Form>
            </Modal>
          </div>}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    changePassword: (user) => dispatch(changePasswordThunk(user))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
