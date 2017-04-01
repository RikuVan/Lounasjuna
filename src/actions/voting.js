import {apiPut, apiDelete} from './requests'
import {fbUrls} from '../dataApi'
import {fetchRestaurants} from './restaurants'

const handler = dispatch => resp => {
  //if we are successful adding out vote with want to update
  //the restaurants. We are using rest for simplicity but in 'real' cases
  //it is better to use firebase's ability to push values in
  //real time rather than its rest api
  if (resp && resp.status === 200) {
    dispatch(fetchRestaurants())
  }
}

export const vote = (userId, restaurantId) => dispatch => {
  dispatch(apiPut({
    url: fbUrls.vote(restaurantId, userId),
    payload: {[userId]: true},
    handler: handler(dispatch)
  }))
}

export const revokeVote = (userId, restaurantId) => dispatch => {
  dispatch(apiDelete({
    url: fbUrls.vote(restaurantId, userId),
    handler: handler(dispatch)
  }))
}