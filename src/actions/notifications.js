export const SEND_NOTIFICATION = 'SEND_NOTIFICATION'
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION'

const notificationMessages = {
  CREATED: 'Uusi lounaspaikka tallennettu!',
  LOGGED_IN: 'Tervetuloa takaisin lounasjunaan!',
  LOGGED_OUT: 'Hei hei, nähdään huomenna junalla',
  OOPS: 'Voi paska, jotain huono on tapahtunut',
}

const NOTIFICATION_TIME = 2000

/**
 * NOTIFICATION ACTION CREATOR
 * @param key
 *
 * We could have done this with middleware instead, listening for certain actions
 * and dispatching notifications as they arrive. This is perhaps a cleaner way
 * to handle it since we don't need to give actions in callbacks for each notification
 */

export const notify = key =>
  dispatch => {
    dispatch({
      type: SEND_NOTIFICATION,
      payload: {key, message: notificationMessages[key]},
    })
    setTimeout(
      () => dispatch({type: DISMISS_NOTIFICATION, payload: {key}}),
      NOTIFICATION_TIME,
    )
  }
