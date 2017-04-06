export const testData = {
  restaurants: {
    'e3660a89-0ece-45b4-9cb8-e32a4c0f376b': {
      address: 'Näsilinnankatu 23, 33210 TAMPERE',
      name: 'Thai & Laos Näsilinnankatu',
      rating: 4.2,
      votes: [{1: true}]
    },
    '12ec6699-ebf3-46ae-95c4-b87d67fd8a46': {
      address: 'Tullikatu 6, 33100 Tampere',
      name: 'Bengol Curry',
      rating: 3.2,
      votes: []
    }
  },
  votes: null
}

const ATTEMPT_REQUEST = 'ATTEMPT_REQUEST'
const COMPLETE_REQUEST = 'COMPLETE_REQUEST'

const attemptRequest = resource => ({
  type: ATTEMPT_REQUEST,
  payload: {resource},
})

const completeRequest = (resource, data, error) => {
  return {
    type: COMPLETE_REQUEST,
    payload: {resource, ...data, error},
  }
}

export const apiFn = type => ({resource, params, payload, handler: responseHandler}) => dispatch => {
    dispatch(attemptRequest(resource))
    const data = testData[resource]
    const response = responseHandler
      ? responseHandler(data)
      : {data}
    return dispatch(completeRequest(resource, response, null))
}

export const apiGet = apiFn('get')
export const apiSet = apiFn('set')
export const apiUnset = apiFn('unset')
export const apiPush = apiFn('push')
export const apiUpdate = apiFn('update')
export const apiRemove = apiFn('remove')