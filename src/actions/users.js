import {apiGet, apiSet} from './requests'

export const FETCH_USERS = 'FETCH_RESTAURANTS'

//firebase will return the users as an object
export const fetchUsers = () => {
  return apiGet({resource: 'users'})
}

export const saveUserToDB = (userId, payload) => dispatch => {
  const handler = () => dispatch(fetchUsers())
  dispatch(apiSet({
    resource: 'users',
    params: {userId},
    payload,
    handler
  }))
}