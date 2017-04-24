import {takeEvery, call, put} from 'redux-saga/effects'
import {database, DB} from '../dataApi'
import initialState from '../initial-state.js'
import {notify} from './notifications'

// Helpers

const handlePush = (resource, params, payload) => {
  //first get a unique ID from firebase
  const payloadKey = database.ref().child(resource).push().key
  const updates = {}
  const resourcePath = `${resource}/${payloadKey}`
  updates[resourcePath] = payload
  return database.ref().update(updates)
}

const createRequest = (type, resource, params = {}, payload, onceValue = false) => {
  console.log('createRequest', type, resource, params, payload, onceValue)
  switch (type) {
    case 'set':
      return DB[resource](params).set(payload)
    case 'unset':
      return DB[resource](params).set(null)
    case 'push':
      return handlePush(resource, params, payload)
    case 'update':
      return DB[resource](params).update(payload)
    case 'remove':
      return DB[resource](params).remove()
    // get
    default:
      return onceValue ? DB[resource](params).once('value') : DB[resource](params)
  }
}

// Selectors

export const getApiData = key => state =>
  state.requests[key] && state.requests[key].data ? state.requests[key].data.data : null
export const isLoading = key => state => state.requests[key] ? state.requests[key].loading : false

// Actions

export const ATTEMPT_REQUEST = 'api/ATTEMPT'
export const COMPLETE_REQUEST = 'api/COMPLETE'

export const attemptRequest = params => ({...params, type: ATTEMPT_REQUEST})
export const completeRequest = (resource, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {resource, data, error},
  }
}

/**
 * The operations below take an config object and return a promise (except remove):
 *   [resource]: string e.g. 'restaurants'
 *   [params]: object e.g. {userId}
 *   [payload]: object e.g. {name: 'rick'}
 *   [handler]: func - use this to process the data or perform another action
 */

const apiFn = method => params => attemptRequest({method, ...params})

export const apiGet = apiFn('get')
export const apiSet = apiFn('set')
//prefer this to remove as it returns a promise, although the result is the same
export const apiUnset = apiFn('unset')
//use for a list in which the keys need to be new unique ids
export const apiPush = apiFn('push')
//use to update only certain properties on an object
export const apiUpdate = apiFn('update')
//beware this does not return a confirmation
export const apiRemove = apiFn('remove')

// Sagas

function* doApiAction(action) {
  const {resource, params, payload, handler: responseHandler, method} = action
  console.log('1', action)
  try {
    if (method === 'get') {
      const snapshot = yield call(createRequest, method, resource, params, payload, true)
      console.log('2', snapshot)
      const data = responseHandler ? responseHandler(snapshot.val()) : {data: snapshot.val()}
      console.log('3', data)
      yield put(completeRequest(resource, data, null))
    } else {
      yield call(createRequest, method, resource, params, payload)
      if (responseHandler) responseHandler()
      yield put(completeRequest(resource, null, null))
    }
  } catch (error) {
    console.log('error', error)
    yield put(completeRequest(resource, null, error))
    yield put(notify('ERROR', JSON.stringify(error)))
  }
}

function* watchApiActions() {
  yield takeEvery(ATTEMPT_REQUEST, doApiAction)
}

export const sagas = [
  watchApiActions(),
]

//firebase also has a REST api which will work in this app for reading data without auth
//import an ajax helper lib like axios and use the data base url with .json to fetch data

// Reducer

export default (state = initialState.requests, action) => {
  switch (action.type) {
    case ATTEMPT_REQUEST:
      return {
        ...state,
        //using the resource id/name as a key using an interpolated string
        //allows us to have one reducer dle a lot of state rather than a
        //separate reducer for each kind of data
        [action.resource]: {
          loading: true,
          data: null,
          status: null,
          error: null,
        },
      }
    case COMPLETE_REQUEST:
      // reducers should not mutate data. The spread operator {...state} copies all the properties
      // of an object or array into a new object, equivalent to Object.assign/R.merge
      return {
        ...state,
        [action.payload.resource]: {
          loading: false,
          data: action.payload.data,
          error: action.payload.error,
        },
      }
    default:
      return state
  }
}
