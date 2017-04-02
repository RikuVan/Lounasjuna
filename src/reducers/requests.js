import initialState from '../initial-state.js'
import {ATTEMPT_REQUEST, COMPLETE_REQUEST} from '../actions/requests'

export default (state = initialState.requests, action) => {
  switch (action.type) {
    case ATTEMPT_REQUEST:
      return {
        ...state,
        //using the resource id/name as a key using an interpolated string
        //allows us to have one reducer dle a lot of state rather than a
        //separate reducer for each kind of data
        [action.payload.resource]: {
          loading: true,
          data: null,
          status: null,
          error: null,
        },
      }
    case COMPLETE_REQUEST:
      // reducers should not mutate data. The spread operator {...state} copies all the properties
      // of an object or array into a new object, equivalent to Object.assign/R.merge
      return {
        ...state,
        [action.payload.resource]: {
          loading: false,
          ...action.payload,
        },
      }
    default:
      return state
  }
}
