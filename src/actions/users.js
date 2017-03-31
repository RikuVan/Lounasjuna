import {apiGet} from './requests'
import {fbUrls} from '../dataApi'

export const FETCH_USERS = 'FETCH_RESTAURANTS'

export const fetchUsers = () => {
  return apiGet({
    url: fbUrls.users(),
    key: 'users'
  })
}