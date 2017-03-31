export const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
export const SIGN_IN = 'SIGIN_IN'
export const SIGN_OUT = 'SIGN_OUT'

import {saveUserToDB} from './users'
import {auth, googleAuthProvider} from '../dataApi'

const signIn = user => ({type: SIGN_IN, payload: user})
const signOut = () => ({type: SIGN_OUT})
const startLogin = () => ({type: ATTEMPTING_LOGIN})

export const attemptSignInWithGoogle = () => (dispatch, getState) => {
  dispatch(startLogin())
  const users = getState().requests.users.data || []
  auth.signInWithPopup(googleAuthProvider).then(({user}) => {
    const userData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid
    }
    //if the user has never signed in before we need to add them to
    //to list of app users in the DB. Is this the right place for this?
    const usersWithCurrentId = users.filter(user => user.uid === userData.uid)
    if (usersWithCurrentId.length < 1) {
      const {uid, ...rest} = userData;
      dispatch(saveUserToDB(uid, rest))
    }
    return userData
  }).then(data => {
    dispatch(signIn(data))
  }).catch(err => console.error(err))
}

export const cancelGoogleAuth = () => dispatch => {
  auth.signOut().then(() =>{
    dispatch(signOut())
  })
}
