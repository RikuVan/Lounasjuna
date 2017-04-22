import {apiGet, apiSet} from './requests'
import {resources} from '../dataApi'

/**
  USER ACTIONS
 */

export const FETCH_USERS = 'FETCH_RESTAURANTS'

/**
 * USER ACTION CREATORS
 */

//firebase will return the users as an object with their uids as the key for each one
export const fetchUsers = () => {
  return apiGet({resource: 'users'})
}

export const addUser = (userId, payload) =>
  dispatch => {
    const handler = () => dispatch(fetchUsers())
    dispatch(
      apiSet({
        resource: resources.USERS,
        params: {userId},
        payload,
        handler,
      }),
    )
  }
