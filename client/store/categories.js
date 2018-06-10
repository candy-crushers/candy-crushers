import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => {
  return {
      type: GET_CATEGORIES,
      categories
  }
}

const addCategoryAction = category => {
  return {
      type: ADD_CATEGORY,
      category
  }
}

const editCategoryAction = category => {
  return {
      type: EDIT_CATEGORY,
      category
  }
}

const deleteCategoryAction = categoryId => {
  return {
      type: DELETE_CATEGORY,
      categoryId
  }
}

/**
 * THUNK CREATORS
 */
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res =>
        dispatch(getCategories(res.data || initialState)))
      .catch(err => console.log(err))

export const addCategory = (categoryName) =>
  dispatch => {
    console.log('In thunk', categoryName);
    axios.post('/api/categories', {name: categoryName})
      .then(res =>
        dispatch(addCategoryAction(res.data)))
      .catch(err => console.log(err))
      }
export const editCategory = (category) =>
  dispatch => {
    console.log('In Thunk', category)
    axios.put(`/api/categories/${category.id}`,{name: category.name})
      .then(res =>
        dispatch(editCategoryAction(res.data)))
      .catch(err => console.log(err))
      }
export const deleteCategory = (categoryId) =>
  dispatch =>
    axios.delete(`/api/categories/${categoryId}`)
    .then(res =>
      dispatch(deleteCategoryAction(categoryId)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    case EDIT_CATEGORY:
      return state.map( category => category.id === Number(action.category.id) ? {...category, name: action.category.name} : category )
    case DELETE_CATEGORY:
      return state.filter( category => category.id !== action.categoryId);
    default:
      return state
  }
}
