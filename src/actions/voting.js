import {apiUpdate, apiRemove} from './requests'
import {fetchRestaurants} from './restaurants'
import {resources} from '../dataApi';

/**
 VOTER ACTION CREATORS
 */

export const vote = (userId, restaurantId) => dispatch => {
  dispatch(apiUpdate({
    resource: resources.VOTES,
    params: {restaurantId},
    payload: {[userId]: true},
    handler: () => dispatch(fetchRestaurants())
  }))
}

export const revokeVote = (userId, restaurantId) => dispatch => {
  dispatch(apiRemove({
    resource: resources.VOTES,
    params: {restaurantId, userId},
    handler: () => dispatch(fetchRestaurants())
  }))
}