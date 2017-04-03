import {SIGN_IN} from '../actions/auth'
import {addUser} from '../actions/users'

/**
 * Save user to DB if new
 * Every action with run through the middleware
 * @param dispatch
 * @param getState
 */

const newUser = ({dispatch, getState}) =>
  next =>
    action => {
      if (action.type === SIGN_IN) {
        let currentUsers = getState().requests.users.data || {}
        const {uid, ...rest} = action.payload
        if (!currentUsers[uid]) {
          dispatch(addUser(uid, rest))
        }
      }
      return next(action)
    }

export default newUser
