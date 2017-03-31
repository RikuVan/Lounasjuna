import initialState from '../initial-state.js'
import {
  ATTEMPT_REQUEST,
  COMPLETE_REQUEST,
} from '../actions/requests'

export default (state = initialState.requests, action) => {
  switch(action.type) {
    case ATTEMPT_REQUEST:
      return {
        ...state,
        [action.payload.key]: {
          loading: true,
          data: null,
          status: null,
          error: null
        }
      }
    case COMPLETE_REQUEST:
      // reducers should not mutate data. The spread operator {...state} copies all the properties
      // of an object or array into a new object, equivalent to Object.assign/R.merge
      return {
        ...state,
        [action.payload.key]: {
          loading: false,
          ...action.payload
        }
      }
    default:
      return state;
  }
}
