import secrets from './secrets'
import firebase from 'firebase'

firebase.initializeApp(secrets.firebaseConfig)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const baseURL = secrets.firebaseConfig.databaseURL
const createFbUrl = path => `${baseURL}/${path}.json`

export const fbUrls = {
  restaurants: () => createFbUrl('restaurants'),
  users: () => createFbUrl('users'),
  user: id => createFbUrl(`users/${id}`),
  vote: (restId, userId) =>
    createFbUrl(`restaurants/${restId}/votes${userId ? `/${userId}` : ''}`)
}