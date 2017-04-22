import {SIGN_IN} from '../actions/auth'
//import {addUser} from '../actions/users'

/**
 * SPRINT 3
 * TODO: check if the a signin action was dispatched and, if so,
 * dispatch the addUser action to save the user to the DB if not already in the store
 * Save user to DB if new
 * Every action with run through the middleware
 * If you are using sagas, then you may choose to do this in a saga instead
 * @param dispatch
 * @param getState
 */

const newUser = ({dispatch, getState}) => next => action => {}

export default newUser
