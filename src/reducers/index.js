import {combineReducers} from 'redux'
import requests from '../ducks/api'
import auth from '../ducks/auth'
import notifications from '../ducks/notifications'
//import {reducer as form} from 'redux-form'

/**
 * The name you give here in combine reducers will be the key you select the data by
 * in the redux state tree
 * @type {Reducer<S>}
 */

const reducer = combineReducers({
  auth,
  requests,
  //form,
  notifications,
})

export default reducer
