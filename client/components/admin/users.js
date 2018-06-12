import React from 'react'
import { connect } from 'react-redux'
import { fetchUsersThunk, changeAdminStatus, deleteUserThunk } from '../../store'
import {Checkbox, Container} from 'semantic-ui-react'

class AdminUsers extends React.Component {

  async componentDidMount(){
    await this.props.fetchUsers()
  }

  render() {
    const {users, changeAdminStatus, deleteUser, currentUser} = this.props
    return (
      <div><br /><br />
      <Container><br />
        {users.length && users.map( user =>
          (
          <div key={user.id}>
            <div>
               {user.email}
            </div>
              <Checkbox
                label='Admin'
                checked={user.isAdmin}
                onChange={() => changeAdminStatus({...user, isAdmin: !user.isAdmin})}
                toggle
              />
            <div>
              {currentUser.id !== user.id ? <button type="button" onClick={() => deleteUser(user.id)}>Delete</button> :
              null }
            </div>
          </div>
          )
        )}
      </Container>
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
    deleteUser: (userId) => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
