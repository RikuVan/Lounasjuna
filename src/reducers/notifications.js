import initialState from '../initial-state.js'
import {
  SEND_NOTIFICATION,
  DISMISS_NOTIFICATION,
} from '../actions/notifications'

//notice this returns a new object, not a mutated payload
const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj).filter(key => key !== deleteKey).reduce((
    result,
    current,
  ) => {
    result[current] = myObj[current]
    return result
  }, {})
}

export default function notifications (
  state = initialState.notifications,
  action,
) {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return {
        ...state,
        [action.payload.key]: {...action.payload},
      }
    case DISMISS_NOTIFICATION:
      return removeByKey(state, action.payload.key)
    default:
      return state
  }
}
