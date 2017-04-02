import {DB} from '../dataApi'

/**
  REQUEST ACTION CONSTANTS
 */

export const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
export const COMPLETE_REQUEST = 'COMPLETE_REQUEST'

/**
  REQUEST ACTION CREATORS - functions that create actions
 */

const attemptRequest = resource => ({type: ATTEMPT_REQUEST, payload: {resource}});
const completeRequest = (resource, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {resource, ...data, error}
  }
}

/**
  Shouldn't need to mess with this, which creates the database query
 */

const createRequest = (type, resource, params = {}, payload) => {
  switch(type) {
    case 'set': return DB[resource](params).set(payload)
    //untested
    case 'push': return DB[resource](params).push()
    case 'update': return DB[resource](params).update(payload)
    case 'remove': return DB[resource](params).remove()
    // get is default
    default: return DB[resource](params)
  }
}

//the .on/.once method for the real time api takes a second error func
const errorCallback = (dispatch, resource) => error => {
  dispatch(completeRequest(resource, null, error))
}

/**
 * main handler for requests
 * see params description below where the curried functions are exported
 */

export const apiFn = type => ({resource, params, payload, handler: responseHandler}) => dispatch => {
  //UI wants to know that we are loading data
  dispatch(attemptRequest(resource))

  const request = createRequest(type, resource, params, payload)

  //remove seems to not have a callback
  //could use set/update(null) for a response/safer delete
  //push is not yet tested - what does it return?
  if (type === 'remove') {
    if (responseHandler) responseHandler()
    return dispatch(completeRequest(resource, null, null))
  }
  //update and set api returns a promise
  //update can also take an object with multiple atomic updates
  if (type === 'update' || type === 'set') {
    return request.then(() => {
      if (responseHandler) responseHandler()
      dispatch(completeRequest(resource, null, null))
    }).catch(err => console.log(err))
  }
  if (type === 'push') console.info('NOT YET IMPLEMENTED')
  //real time api but once listens for event then turns off
  return request.once('value', snapshot => {
    const data = responseHandler ?
      responseHandler(snapshot.val()) :
      {data: snapshot.val()}
    return dispatch(completeRequest(resource, data, null))
  }, errorCallback(dispatch, resource))
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
export const apiPush = apiFn('push')
export const apiUpdate = apiFn('update')
export const apiRemove = apiFn('remove')

//firebase also has a REST api which will work in this app for reading data without auth
//import an ajax helper lib like axios and use the data base url with .json to fetch data


