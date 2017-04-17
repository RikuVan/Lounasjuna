import {apiGet, apiPush} from './requests'
import {processRestaurantData} from './helpers'
import {resources} from '../dataApi'
import {notify} from './notifications'

/**
  RESTAURANTS ACTIONS
 */

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

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
