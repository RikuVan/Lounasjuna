import {apiGet} from './requests'
import {objectToArray, objectKeysToArray} from './helpers'
import {resources} from '../dataApi';

/**
  RESTAURANTS ACTIONS
 */

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

/**
  Restaurant Utils for modeling data
 */

//perhaps offer an api for sorting by number of votes as well?
const sortByRating = (a, b) => (b.rating || 0) - (a.rating || 0);

//in firebase it is much easier to work with data in objects
//but in react arrays are convenient
const processRestaurantData = data => {
  return objectToArray(data)
    .map(obj => {
      const votes = objectKeysToArray(obj.votes)
      return Object.assign(obj, {votes});
    })
    .filter(x => x)
    .sort(sortByRating)
}

/**
 * RESTAURANT ACTION CREATORS
 */

export const fetchRestaurants = () => {
  //change into array & get rid of null values & sort by rating
  const handler = data => ({data: processRestaurantData(data)});
  return apiGet({
    resource: resources.RESTAURANTS,
    handler
  })
}