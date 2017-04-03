import {auth, googleAuthProvider} from '../dataApi'

/**
 * AUTH ACTIONS
 * @type {string}
 */

export const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
export const SIGN_IN = 'SIGIN_IN'
export const SIGN_OUT = 'SIGN_OUT'

/**
 * AUTH ACTION CREATORS
 * @param user
 */

const signIn = user => ({type: SIGN_IN, payload: user})
const signOut = () => ({type: SIGN_OUT})
const startLogin = () => ({type: ATTEMPTING_LOGIN})

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
        return dispatch(signIn(userData))
      })
      .catch(err => console.error(err))
  }

// logout
export const cancelGoogleAuth = () =>
  dispatch => {
    auth.signOut().then(() => {
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
