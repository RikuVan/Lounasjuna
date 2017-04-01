import {apiUpdate, apiRemove} from './requests'
import {fetchRestaurants} from './restaurants'

export const vote = (userId, restaurantId) => dispatch => {
  dispatch(apiUpdate({
    resource: 'votes',
    params: {restaurantId},
    payload: {[userId]: true},
    handler: () => dispatch(fetchRestaurants())
  }))
}

export const revokeVote = (userId, restaurantId) => dispatch => {
  dispatch(apiRemove({
    resource: 'votes',
    params: {restaurantId, userId},
    handler: () => dispatch(fetchRestaurants())
  }))
}