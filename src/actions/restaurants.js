import {apiGet} from './requests'
import {fbUrls} from '../dataApi'

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

const sortByRating = (a, b) => (b.rating || 0) - (a.rating || 0);

export const fetchRestaurants = () => {
  const handler = resp => {
    //get rid of null values & sort by rating
    const data = resp.data.filter(x => x).sort(sortByRating);
    return {...resp, data}
  }
  return apiGet({
    url: fbUrls.restaurants(),
    key: 'restaurants',
    handler
  })
}