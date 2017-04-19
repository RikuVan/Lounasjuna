import {eventChannel} from 'redux-saga'
import {call, put, take, takeEvery} from 'redux-saga/effects'
import {auth, googleAuthProvider} from '../dataApi'
import {notify} from './notifications'
import {isEmpty} from '../utils'
import initialState from '../initial-state'

// Helpers

const getRelevantUserDataFromResponse = user => ({
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
})


// Actions

export const ATTEMPTING_LOGIN = 'auth/ATTEMPTING_LOGIN'
export const SIGN_IN = 'auth/SIGN_IN'
export const SIGN_OUT = 'auth/SIGN_OUT'
export const CANCEL_AUTH = 'auth/CANCEL'

export const signIn = user => ({type: SIGN_IN, payload: getRelevantUserDataFromResponse(user)})
export const signOut = () => ({type: SIGN_OUT})
export const startLogin = () => ({type: ATTEMPTING_LOGIN})
export const cancelGoogleAuth = () => ({type: CANCEL_AUTH})

export const attemptSignInWithGoogle = startLogin

// Selectors

export const getUser = state => state.auth.user
export const isLoggedIn = state => !!getUser(state).uid

// Sagas

function* login() {
  try {
    // If the yielded function call returns a promise we can just assign its return value.
    // No need for .then(), yay!
    const response = yield call([auth, auth.signInWithPopup], googleAuthProvider)
    // TODO: if the user has never signed in before we need to add them to
    // to list of users in the DB here by checking state for the user
    // and dispatching an action
    const user = response.user
    if (user && !isEmpty(user)) {
      yield put(signIn(user))
    }
  } catch (error) {
    console.log('login error:', error)
  }
}

function* watchLogin() {
  // takeEvery/takeLatest is an alternative to the "while (true)" pattern
  yield takeEvery(ATTEMPTING_LOGIN, login)
}

const subscribe = () =>
  eventChannel(emit => auth.onAuthStateChanged(user => emit(user || {})))

function* watchAuthentication() {
  const channel = yield call(subscribe)
  // Keep on taking events from the eventChannel till infinity
  while (true) {
    const user = yield take(channel)
    if (user && !isEmpty(user)) {
      try {
        yield put(signIn(user))
        return user
      } catch (error) {
        console.log('auth error:', error)
      }
    }
    yield put(signOut())
  }
}

function* doCancelAuth() {
  try {
    yield call([auth, auth.signOut])
    yield put(signOut())
    yield put(notify('LOGGED_OUT'))
  } catch (error) {
    console.log('cancel auth error:', error)
  }
}

function* watchCancel() {
  // takeEvery/takeLatest is an alternative to the "while (true)" pattern
  yield takeEvery(CANCEL_AUTH, doCancelAuth)
}

// Instead of manually calling notify after each SIGN_IN let's just trigger it automatically.
// With redux-thunk you'd use a custom middleware to dispatch an action following a certain action.
function* doShowNotification() {
  yield put(notify('LOGGED_IN'))
}

function* showLoginNotification() {
  yield takeEvery(SIGN_IN, doShowNotification)
}

export const sagas = [
  watchLogin(),
  watchAuthentication(),
  watchCancel(),
  showLoginNotification(),
]

// Reducer

export default function reducer(state = initialState.auth, action) {
  switch(action.type) {
    case ATTEMPTING_LOGIN:
      return {
        loading: true,
        user: {},
      }
    case SIGN_IN:
      return {
        loading: false,
        user: {...action.payload},
      }
    case SIGN_OUT:
      return {
        user: {}
      }
    default:
      return state
  }
}
