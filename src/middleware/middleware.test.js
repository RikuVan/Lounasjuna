import newUserMiddleware from './new-user'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk, newUserMiddleware]
const mockStore = configureMockStore(middlewares)
import {signIn} from '../actions/auth'

test('does not addUser when siging in if user is in user list', done => {
  const user = {uid: "1", displayName: "Teemu"}
  const storeData = {
    requests: {
      users: {data: {1: 'Teemu'}}
    }
  }
  const store = mockStore(storeData)
  const prom = Promise.resolve(store.dispatch(signIn(user)))
  return prom.then(() => {
    const getUserActions =
      store.getActions().filter(
        action => action.type === 'ATTEMPT_REQUEST' && action.payload.resource === 'users')
    expect(getUserActions.length).toEqual(0)
    return done()
  })
})

test('calls add user when signing in when user in user list state', done => {
  const user = {uid: "1", displayName: "Teemu"}
  const storeData = {
    requests: {
      users: {data: {0: 'Teemu'}}
    }
  }
  const store = mockStore(storeData)
  const prom = Promise.resolve(store.dispatch(signIn(user)))
  return prom.then(() => {
    const getUserActions =
      store.getActions().filter(
        action => action.type === 'ATTEMPT_REQUEST' && action.payload.resource === 'users')
    expect(getUserActions.length).toEqual(1)
    return done()
  })
})
