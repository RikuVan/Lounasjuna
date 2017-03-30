import {apiGet} from './requests'
import {fbUrls} from '../dataApi'

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

export const fetchRestaurants = () => {
  const handler = resp => {
    //get rid of null values
    const data = resp.data.filter(x => x);
    return {...resp, data}
  }
  return apiGet({
    url: fbUrls.restaurants(),
    key: 'restaurants',
    handler
  })
}