import {apiGet, apiPut} from './requests'
import {fbUrls} from '../dataApi'

export const FETCH_USERS = 'FETCH_RESTAURANTS'

export const fetchUsers = () => {
  return apiGet({
    url: fbUrls.users(),
    key: 'users'
  })
}

export const saveUserToDB = (userId, payload) => dispatch => {
  const handler = () => dispatch(fetchUsers())
  dispatch(apiPut({
    url: fbUrls.user(userId),
    payload,
    handler
  }))
}