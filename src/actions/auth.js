import {auth, googleAuthProvider} from '../dataApi'
import {notify} from './notifications'

/**
 * AUTH ACTIONS
 * @type {string}
 */

export const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

/**
 * AUTH ACTION CREATORS
 * @param user
 */

//exported for testing purposes
export const signIn = user => ({type: SIGN_IN, payload: user})
export const signOut = () => ({type: SIGN_OUT})
export const startLogin = () => ({type: ATTEMPTING_LOGIN})

const getRelevantUserDataFromResponse = user => ({
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
})

/**
 * main action for signing in with a popup
 */

export const attemptSignInWithGoogle = () =>
  dispatch => {
    dispatch(startLogin())
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({user}) => {
        const userData = getRelevantUserDataFromResponse(user)
        //if the user has never signed in before we need to add them to
        //to list of users in the DB here by checking state for the user
        //and dispatching an action, but in our case we will do this is middleware
        dispatch(notify('LOGGED_IN'))
        return dispatch(signIn(userData))
      })
      .catch(err => console.error(err))
  }

// logout
export const cancelGoogleAuth = () =>
  dispatch => {
    auth.signOut().then(() => {
      dispatch(notify('LOGGED_OUT'))
      dispatch(signOut())
    })
  }

// this is creates an open weg socket which will push a new
// value when the user is logged in or logged out
export const listenToAuthChanges = () =>
  dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userData = getRelevantUserDataFromResponse(user)
        dispatch(signIn(userData))
      } else {
        dispatch(signOut())
      }
    })
  }
