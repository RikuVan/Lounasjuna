import axios from 'axios'

export const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
export const COMPLETE_REQUEST = 'COMPLETE_REQUEST'

const attemptRequest = key => ({type: ATTEMPT_REQUEST, payload: {key}});
const completeRequest = (key, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {key, ...data, error}
  }
}

export const apiFn = type => ({url, key, payload, handler: responseHandler}) => dispatch => {
  //UI wants to know that we are loading data
  dispatch(attemptRequest(key));

  let reqFn = () => axios[type](url);

  if (type === 'post' || type === 'put') {
    reqFn = () => axios[type](url, payload)
  }

  return reqFn()
          .then(resp => {
            return responseHandler ?
              responseHandler(resp) :
              {...resp};
          })
          .then(data => {
            dispatch(completeRequest(key, data, null))
          })
          .catch(error => {
            dispatch(completeRequest(key, null, error, error.status))
          })
}

export const apiGet = apiFn('get')
export const apiPut = apiFn('put')
export const apiPost = apiFn('post')
export const apiDelete = apiFn('delete')

