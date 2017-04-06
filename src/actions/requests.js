import {database, DB} from '../dataApi'

/**
  REQUEST ACTION CONSTANTS
 */

export const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
export const COMPLETE_REQUEST = 'COMPLETE_REQUEST'

/**
  REQUEST ACTION CREATORS - functions that create actions
 */

//exported to test
export const attemptRequest = resource => ({
  type: ATTEMPT_REQUEST,
  payload: {resource},
})
export const completeRequest = (resource, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {resource, ...data, error},
  }
}

/**
  Shouldn't need to mess with these database queries
  somewhat of a quirky api
 */

const handlePush = (resource, params, payload) => {
  //first get a unique ID from firebase
  const payloadKey = database.ref().child(resource).push().key
  const updates = {}
  const resourcePath = `${resource}/${payloadKey}`
  updates[resourcePath] = payload
  return database.ref().update(updates)
}

const createRequest = (type, resource, params = {}, payload) => {
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
      return DB[resource](params)
  }
}

//the .on/.once method for the real time api takes a second func, an error callback
const errorCallback = (dispatch, resource) =>
  error => {
    dispatch(completeRequest(resource, null, error))
  }

/**
 * main handler for requests
 * see params description below where the curried functions are exported
 */

export const apiFn = type =>
  ({resource, params, payload, handler: responseHandler}) =>
    dispatch => {
      //UI wants to know that we are loading data
      dispatch(attemptRequest(resource))

      const request = createRequest(type, resource, params, payload)

      //remove operation does not receive response
      //could use set(null) for a response/safer delete
      if (type === 'remove') {
        if (responseHandler) responseHandler()
        return dispatch(completeRequest(resource, null, null))
      }

      //real time api but once listens for event then turns off
      if (type === 'get') {
        return request.once(
          'value',
          snapshot => {
            const data = responseHandler
              ? responseHandler(snapshot.val())
              : {data: snapshot.val()}
            return dispatch(completeRequest(resource, data, null))
          },
          errorCallback(dispatch, resource),
        )
      }

      return request
        .then(() => {
          if (responseHandler) responseHandler()
          dispatch(completeRequest(resource, null, null))
        })
        .catch(err => console.log(err))
    }

/**
 * The operations below take an object:
 *   [resource]: string e.g. 'restaurants'
 *   [params]: object e.g. {userId}
 *   [payload]: object e.g. {name: 'rick'}
 *   [handler]: func - use this to process the data or perform another action
 */

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

//firebase also has a REST api which will work in this app for reading data without auth
//import an ajax helper lib like axios and use the data base url with .json to fetch data
