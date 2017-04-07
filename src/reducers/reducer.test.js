import auth from './auth'
import requests from './requests'
import notifications from './notifications'
import * as authActions from '../actions/auth'
import * as requestActions from '../actions/requests'
import * as notificationActions from '../actions/notifications'
import initialState from '../initial-state'

describe('auth reducer', () => {
  it('Should have user is loading on ATTEMPT_LOGIN', () => {
    const authAction = authActions.startLogin()
    const newState = auth(initialState.auth, authAction)
    expect(newState).toEqual(
      Object.assign({}, initialState.auth, {status: 'AWAITING_AUTH_RESPONSE'}),
    )
  })
  it('Should add user to state on SIGN_IN', () => {
    const user = {
      email: 'test@gmail.com',
      displayName: 'John Doe',
      photoURL: 'https://testurl.com',
      uid: '99999-00000',
    }
    const authAction = authActions.signIn(user)
    const newState = auth(initialState.auth, authAction)
    expect(newState).toEqual(Object.assign({}, user, {status: 'SIGNED_IN'}))
  })
  it('Should return to initial state on SIGN_OUT', () => {
    const authAction = authActions.signOut()
    const newState = auth(initialState.auth, authAction)
    expect(newState).toEqual(initialState.auth)
  })
})

describe('requests reducer', () => {
  it('Should have keyed object is loading on ATTEMPT_REQUEST', () => {
    const expectedState = {
      restaurants: {
        loading: true,
        data: null,
        status: null,
        error: null,
      },
    }
    const requestAction = requestActions.attemptRequest('restaurants')
    const newState = requests({}, requestAction)
    expect(newState).toEqual(expectedState)
  })
  it('Should return data at keyed object on COMPLETE_REQUEST', () => {
    const response = {data: [{name: "Pepe's Pizza", rating: 2}]}
    const requestAction = requestActions.completeRequest(
      'restaurants',
      response,
    )
    const newState = requests({}, requestAction)
    expect(newState).toEqual({
      restaurants: Object.assign(response, {
        error: undefined,
        loading: false,
        resource: 'restaurants',
      }),
    })
  })
})

describe('notifications reducer', () => {
  it('Should have keyed notification on SEND_NOTIFICATION', () => {
    const newState = notifications(
      {},
      {type: 'SEND_NOTIFICATION', payload: {key: 'OOPS', message: 'oops'}},
    )
    expect(newState).toEqual({OOPS: {message: 'oops', key: 'OOPS'}})
  })
  it('Should remove keyed notification on DISMISS_NOTIFICATION', () => {
    const newState = notifications(
      {},
      {type: 'DISMISS_NOTIFICATION', payload: {key: 'OOPS'}},
    )
    expect(newState).toEqual({})
  })
})
