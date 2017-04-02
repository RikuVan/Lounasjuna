import initialState from '../initial-state.js'
import {ATTEMPTING_LOGIN, SIGN_OUT, SIGN_IN} from '../actions/auth'

export default function authReducer (state = initialState.auth, action) {
  switch (action.type) {
    case ATTEMPTING_LOGIN:
      return {
        status: 'AWAITING_AUTH_RESPONSE',
      }
    case SIGN_OUT:
      return {
        status: 'ANONYMOUS',
        email: null,
        displayName: null,
        photoURL: null,
        uid: null,
      }
    case SIGN_IN:
      return {
        status: 'SIGNED_IN',
        ...action.payload,
      }
    default:
      return state
  }
}
