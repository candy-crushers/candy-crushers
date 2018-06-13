import React from 'react'
import { connect } from 'react-redux'
import { fetchUsersThunk, changeAdminStatus, changePasswordTriggerThunk,  deleteUserThunk } from '../../store'
import {Checkbox, Header, Button, Table, TableCell} from 'semantic-ui-react'

class AdminUsers extends React.Component {

  async componentDidMount(){
    await this.props.fetchUsers()
  }

  render() {
    const {users, changeAdminStatus, changePassword, deleteUser, currentUser} = this.props
    return (
      <div>
        <div id="users-header">
          <Header color="pink" as="h1">Users</Header>
        </div>
          <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Admin Status</Table.HeaderCell>
              <Table.HeaderCell>Password Reset</Table.HeaderCell>
              <Table.HeaderCell>Delete User</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {users.length && users.map( user =>
            (
            <Table.Row key={user.id}>
              <Table.Cell>
                {user.email}
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  checked={user.isAdmin}
                  onChange={() => changeAdminStatus({...user, isAdmin: !user.isAdmin})}
                  toggle
                  fitted
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => changePassword(user) }
                  disabled={!user.isVerified}
                  color="brown"
                >
                Reset
                </Button>
              </Table.Cell>
              <Table.Cell>
                {currentUser.id !== user.id ? <Button color="red" onClick={() => deleteUser(user.id)}>Delete</Button> :
                null }
              </Table.Cell>
            </Table.Row>
            )
          )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.allusers,
    currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsersThunk()),
    changeAdminStatus: (user) => dispatch(changeAdminStatus(user)),
    changePassword: (user) => dispatch(changePasswordTriggerThunk(user)),
    deleteUser: (userId) => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
