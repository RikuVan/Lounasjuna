import secrets from './secrets';
import firebase from 'firebase';

firebase.initializeApp(secrets.firebaseConfig);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();