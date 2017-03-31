export const ATTEMPTING_LOGIN = 'ATTEMPTING_LOGIN'
export const SIGN_IN = 'SIGIN_IN'
export const SIGN_OUT = 'SIGN_OUT'

import {addUser} from './users'
import {auth, googleAuthProvider} from '../dataApi'

const signIn = user => ({type: SIGN_IN, payload: user})
const signOut = () => ({type: SIGN_OUT})
const startLogin = () => ({type: ATTEMPTING_LOGIN})

export const attemptSignInWithGoogle = () => dispatch => {
  dispatch(startLogin())
  auth.signInWithPopup(googleAuthProvider).then(({user}) => {
    dispatch(signIn(user))
    dispatch(addUser(user))
  })
}

export const cancelGoogleAuth = () => dispatch => {
  auth.signOut().then(() =>{
    dispatch(signOut())
  })
}
