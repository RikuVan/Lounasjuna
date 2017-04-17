import initialState from '../initial-state.js'

/***
 * SPRINT 2
 * TODO: create the reducer for each of the auth action types,
 * making sure you don't mutate state inside the reducer
 * @param state
 * @param action
 */

//While switch statements have become the most common way to handle actions,
//it is not the only option. If you, like Petri, dislike them, you might try
//something else http://redux.js.org/docs/faq/Reducers.html#reducers-use-switch
export default function authReducer(state = initialState.auth, action) {}
