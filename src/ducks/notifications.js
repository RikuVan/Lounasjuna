import initialState from '../initial-state'
import {delay} from 'redux-saga'
import {takeEvery, call, put} from 'redux-saga/effects'

// Helpers

const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj).filter(key => key !== deleteKey).reduce((
    result,
    current,
  ) => {
    result[current] = myObj[current]
    return result
  }, {})
}

// Actions

export const TRIGGER_NOTIFICATION = 'notification/TRIGGER'
export const SHOW_NOTIFICATION = 'notification/SHOW'
export const HIDE_NOTIFICATION = 'notification/HIDE'

export const notify = (id, message) => ({type: TRIGGER_NOTIFICATION, id, message})

// Selectors

export const getNotifications = state => state.notifications

// Sagas

const NOTIFICATION_VISIBLE_DELAY = 5000

// redux-saga supports things like delay and throttle out-of-the-box so chaining actions is simple
function* doNotify(action) {
  yield put({type: SHOW_NOTIFICATION, id: action.id, message: action.message})
  yield call(delay, NOTIFICATION_VISIBLE_DELAY)
  yield put({type: HIDE_NOTIFICATION, id: action.id})
}

function* watchNotifications() {
  yield takeEvery(TRIGGER_NOTIFICATION, doNotify)
}

export const sagas = [
  watchNotifications(),
]

// Reducer

export default function reducer(state = initialState.notifications, action) {
  const {id, message} = action
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        [id]: message || id,
      }
    case HIDE_NOTIFICATION:
      return removeByKey(state, id)
    default:
      return state
  }
}
