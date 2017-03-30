import {apiGet} from './requests'
import {fbUrls} from '../dataApi'

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

export const fetchRestaurants = () => {
  return apiGet({
    url: fbUrls.restaurants(),
    key: 'restaurants'
  })
}