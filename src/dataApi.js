import secrets from './secrets'
import firebase from 'firebase'

/**
 * FIREBASE CONFIG
 * you shouldn't need to touch this stuff, as long as you export your config from secrets.js
 */

firebase.initializeApp(secrets.firebaseConfig)

export default firebase

export const database = firebase.database()
export const messaging = firebase.messaging()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

//creates the URLs needed to query the firebase database
export const DB = {
  restaurants: () => database.ref('restaurants'),
  users: ({userId = ''}) => database.ref(`users${userId ? `/${userId}` : ''}`),
  votes: ({restaurantId, userId}) =>
    database.ref(
      `restaurants/${restaurantId}/votes${userId ? `/${userId}` : ''}`,
    ),
}

//each of these represents a main branch which can be queried from the firebase tree-type database
export const resources = {
  RESTAURANTS: 'restaurants',
  USERS: 'users',
  VOTES: 'votes',
}
