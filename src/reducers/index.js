import {combineReducers} from 'redux'
import requests from './requests'
import auth from './auth'

const reducer = combineReducers({
  auth,
  requests
});

export default reducer;