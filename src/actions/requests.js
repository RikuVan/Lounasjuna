import {dbResource} from '../dataApi'
export const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
export const COMPLETE_REQUEST = 'COMPLETE_REQUEST'

const attemptRequest = resource => ({type: ATTEMPT_REQUEST, payload: {resource}});
const completeRequest = (resource, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {resource, ...data, error}
  }
}

const errorCallback = (dispatch, resource) => error => {
  dispatch(completeRequest(resource, null, error))
}

const createRequest = (type, resource, params = {}, payload) => {
  if (type === 'set') {
    return dbResource[resource](params).set(payload)
  } else if (type === 'push') {
    //untested
    return dbResource[resource](params).push().key
  } else if (type === 'update') {
    return dbResource[resource](params).update(payload)
  } else if (type === 'remove') {
    return dbResource[resource](params).remove()
  }
  return dbResource[resource](params)
}

export const apiFn = type => ({resource, params, payload, handler: responseHandler}) => dispatch => {
  //UI wants to know that we are loading data
  dispatch(attemptRequest(resource))

  const request = createRequest(type, resource, params, payload)
  //this is the firebase real time api once is alternative to an open web socket
  //so closer to rest api behaviour
  if (type === 'remove' || type === 'push' || type === 'update') {
    return responseHandler ? responseHandler(null) : null;
  }
  return request.once('value', snapshot => {
    const data = responseHandler ?
      responseHandler(snapshot.val()) :
      {data: snapshot.val()}
    return dispatch(completeRequest(resource, data, null))
  }, errorCallback(dispatch, resource))
}

export const apiGet = apiFn('get')
export const apiSet = apiFn('set')
export const apiPush = apiFn('push')
export const apiUpdate = apiFn('update')
export const apiRemove = apiFn('remove')

