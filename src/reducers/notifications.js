import initialState from '../initial-state.js'
import {
  SEND_NOTIFICATION,
  DISMISS_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../actions/notifications'

const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj).filter(key => key !== deleteKey).reduce((
    result,
    current,
  ) => {
    result[current] = myObj[current]
    return result
  }, {})
}

export default function notifications (state = iniitialState, action) {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return {
        ...state,
        [action.payload.id]: {...action.payload},
      }
    case DISMISS_NOTIFICATION:
      return removeByKey(state, action.id)
    case CLEAR_NOTIFICATIONS:
      return {}
    default:
      return initialState
  }
}
