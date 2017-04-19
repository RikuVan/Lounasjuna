import {apiGet, apiPush} from './api'
import {processRestaurantData} from '../actions/helpers'
import {resources} from '../dataApi'
import {notify} from './notifications'

// Actions

export const FETCH_RESTAURANTS = 'restaurants/FETCH'

// TODO convert to saga

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
