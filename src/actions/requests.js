import axios from 'axios'

export const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
export const COMPLETE_REQUEST = 'COMPLETE_REQUEST'


const attemptRequest = key => ({type: ATTEMPT_REQUEST, payload: key});
const completeRequest = (key, data, error, status) => ({
  type: key,
  payload: {data, error, status}
})


export const apiFn = type => (url, key, payload) => dispatch => {
  //out UI wants to know that we are loading data
  dispatch(attemptRequest(key));

  let reqFn = () => axios[type](url);

  if (type === 'post' || type === 'put') {
    reqFn = () => axios[type](url, payload)
  }

  return reqFn()
          .then(resp => {
            dispatch(completeRequest(key, resp.data, null, resp.status))

          })
          .catch(error => {
            dispatch(completeRequest(key, null, error, error.status))
          })
}

export const apiGet = apiFn('get')
export const apiPut = apiFn('put')
export const apiPost = apiFn('post')
export const apiDelete = apiFn('delete')

