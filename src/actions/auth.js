import {addUser} from './users'
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
  uid: user.uid
})

const handleUserIfNew = (user, currentUsers, dispatch) => {
  const {uid, ...rest} = user;
  if (!currentUsers[uid]) {
    dispatch(addUser(uid, rest))
  }
}

/**
 * main action for signing in with a popup
 */

export const attemptSignInWithGoogle = () => (dispatch, getState) => {
  dispatch(startLogin())
  const currentUsers = getState().requests.users.data || {}
  auth.signInWithPopup(googleAuthProvider).then(({user}) => {
    const userData = getRelevantUserDataFromResponse(user)
    //if the user has never signed in before we need to add them to
    //to list of users in the DB. Is this the right place for this?
    handleUserIfNew(userData, currentUsers, dispatch)
    return userData
  }).then(data => {
    dispatch(signIn(data))
  }).catch(err => console.error(err))
}

// logout
export const cancelGoogleAuth = () => dispatch => {
  auth.signOut().then(() =>{
    dispatch(signOut())
  })
}

// this is creates an open weg socket which will push a new
// value when the user is logged in or logged out
export const listenToAuthChanges = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const userData = getRelevantUserDataFromResponse(user)
      dispatch(signIn(userData))
    } else {
      dispatch(signOut())
    }
  })
}
