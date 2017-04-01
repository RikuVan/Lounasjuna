import secrets from './secrets'
import firebase from 'firebase'

firebase.initializeApp(secrets.firebaseConfig)

export default firebase

const DB = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const dbResource = {
  restaurants: () => DB.ref('restaurants'),
  users: ({userId = ''}) => DB.ref(`users${userId ? `/${userId}` : ''}`),
  votes: ({restaurantId, userId}) =>
    DB.ref(`restaurants/${restaurantId}/votes${userId ? `/${userId}` : ''}`)
}