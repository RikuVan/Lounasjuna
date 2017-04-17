import {database, messaging} from './dataApi'

/***
 * sets token on user in DB for use with service worker to push notification
 * @param user
 */

const setMessagingToken = user => {
  messaging
    .requestPermission()
    .then(() => messaging.getToken())
    .then(token => {
      database.ref('users').child(user.uid).child('token').set(token)
    })
    .catch(console.error)
}

export default setMessagingToken
