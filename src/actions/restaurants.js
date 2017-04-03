import {apiGet, apiPush} from './requests'
import {objectToArray, objectKeysToArray} from './helpers'
import {resources} from '../dataApi'
import {notify} from './notifications'

/**
  RESTAURANTS ACTIONS
 */

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

/**
  Restaurant Utils for modeling data
 */

//perhaps offer an api for sorting by number of votes as well?
const sortByRating = (a, b) => (b.rating || 0) - (a.rating || 0)
const sortByVotes = (a, b) => {
  const aVotes = a.votes ? a.votes.length : 0
  const bVotes = b.votes ? b.votes.length : 0
  return bVotes - aVotes
}

//in firebase it is much easier to work with data in objects
//but in react arrays are convenient
const processRestaurantData = data => {
  return objectToArray(data)
    .map(obj => {
      const votes = objectKeysToArray(obj.votes)
      return Object.assign(obj, {votes})
    })
    .filter(x => x)
    .sort(sortByRating)
    .sort(sortByVotes)
}

/**
 * RESTAURANT ACTION CREATORS
 */

export const fetchRestaurants = () => {
  //change into array & get rid of null values & sort by rating
  const handler = data => ({data: processRestaurantData(data)})
  return apiGet({
    resource: resources.RESTAURANTS,
    handler,
  })
}

export const addRestaurant = payload =>
  dispatch => {
    const handler = () => {
      dispatch(notify('CREATED'))
      dispatch(fetchRestaurants())
    }
    return dispatch(
      apiPush({
        resource: resources.RESTAURANTS,
        payload,
        handler,
      }),
    )
  }
