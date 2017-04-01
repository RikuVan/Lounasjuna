import {apiGet} from './requests'
import {fbUrls} from '../dataApi'
import {objectToArray, objectKeysToArray} from './helpers'

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

const sortByRating = (a, b) => (b.rating || 0) - (a.rating || 0);

//in firebase it is much easier to work with data in objects
//but in react arrays are convenient
const processRestaurantData = resp => {
  return objectToArray(resp)
    .map(obj => {
      const votes = objectKeysToArray(obj.votes)
      return Object.assign(obj, {votes});
    })
    .filter(x => x)
    .sort(sortByRating)
}

export const fetchRestaurants = () => {
  const handler = resp => {
    //get rid of null values & sort by rating
    const data = processRestaurantData(resp);
    return {...resp, data}
  }
  return apiGet({
    url: fbUrls.restaurants(),
    key: 'restaurants',
    handler
  })
}