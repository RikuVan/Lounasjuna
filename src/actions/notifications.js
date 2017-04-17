/***
 * SPRINT 5
 * TODO: create action type constants and at least one action creator
 * if you like you can both dipatch the showing of the notification and dispatch
 * its dismissal in the same action creator using a setTimout
 * below are some example messages, feel free to change them
 */

/*
const notificationMessages = {
  CREATED: 'Uusi lounaspaikka tallennettu!',
  LOGGED_IN: 'Tervetuloa takaisin lounasjunaan!',
  LOGGED_OUT: 'Hei hei, nähdään huomenna junalla',
  OOPS: 'Voi paska, jotain huono on tapahtunut',
}
*/

/**
 * NOTIFICATION ACTION CREATOR
 * @param key
 *
 * We could have done this with middleware instead, listening for certain actions
 * and dispatching notifications as they arrive. This is perhaps a cleaner way
 * to handle it since we don't need to give actions in callbacks for each notification
 */
