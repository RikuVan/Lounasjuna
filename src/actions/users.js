import {apiGet, apiPut} from './requests'
import {fbUrls} from '../dataApi'
import {objectToArray} from './helpers'

export const FETCH_USERS = 'FETCH_RESTAURANTS'

export const fetchUsers = () => {
  //an idiosyncracy of the firebase DB is that everything is an object, the exception
  //being if you save the keys as indexes then it will create an array (with nulls for blanks)
  //so this handler just makes the return value a little more typical by coverting it to an array
  const handler = resp => objectToArray(resp)
  return apiGet({
    url: fbUrls.users(),
    key: 'users',
    handler
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