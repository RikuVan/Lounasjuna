import {auth, googleAuthProvider} from '../dataApi'
//Later you may want to dispatch when logging in/out
//import {notify} from './notifications'
import registerMessaging from '../request-messaging-permission'

/**
 * TODO: add three auth action type constants
 * AUTH ACTIONS
 * @type {string}
 */


/**
 * TODO: add three auth action creators
 * AUTH ACTION CREATORS
 * @param user
 */

//export the action creators for testing purposes


const getRelevantUserDataFromResponse = user => ({
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
})

/**
 * main action for signing in with a popup
 */

/***
 * SPRINT 2
 * TODO: You will need to dispatch the login/logout actions in the correct places below
 */

export const attemptSignInWithGoogle = () =>
  dispatch => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({user}) => {
        const userData = getRelevantUserDataFromResponse(user)
        //if the user has never signed in before we need to add them to
        //to list of users in the DB here by checking state for the user
        //and dispatching an action, but in our case we will do this is middleware

      })
      .catch(err => console.error(err))
  }

// logout
export const cancelGoogleAuth = () =>
  dispatch => {
    auth.signOut().then(() => {

    })
  }

// this is creates an open weg socket which will push a new
// value when the user is logged in or logged out
export const listenToAuthChanges = () =>
  dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        registerMessaging(user)
        const userData = getRelevantUserDataFromResponse(user)

      } else {

      }
    })
  }
