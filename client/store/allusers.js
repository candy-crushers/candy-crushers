import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const EDIT_USER = 'EDIT_USER'
const ADMIN_REMOVE_USER = 'ADMIN_REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const editUser = user => ({type: EDIT_USER, user})
const removeUser = (userId) => ({type: ADMIN_REMOVE_USER, userId})

/**
 * THUNK CREATORS
 */

export const fetchUsersThunk = () =>
  dispatch =>
    axios.get('/api/admin/users')
      .then(res =>
        dispatch(getUsers(res.data || initialState)))
      .catch(err => console.log(err))

export const changeAdminStatus = (user) =>
  dispatch =>
    axios.put(`/api/admin/users/${user.id}`, {isAdmin: user.isAdmin})
    .then(res =>
      dispatch(editUser(res.data)))
    .catch(err => console.log(err))

export const deleteUserThunk = (userId) =>
  dispatch =>
    axios.delete(`/api/admin/users/${userId}`)
    .then( () =>
      dispatch(removeUser(userId)))
    .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case EDIT_USER:
      return state.map(user => user.id === action.user.id ? action.user : user)
    case ADMIN_REMOVE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
