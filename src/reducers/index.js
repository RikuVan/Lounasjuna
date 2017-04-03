import {combineReducers} from 'redux'
import requests from './requests'
import auth from './auth'
import notifications from './notifications'
import {reducer as form} from 'redux-form'

/**
 * The name you give here in combine reducers will be the key you select the data by
 * in the redux state tree
 * @type {Reducer<S>}
 */

const reducer = combineReducers({
  auth,
  requests,
  form,
  notifications,
})

export default reducer
