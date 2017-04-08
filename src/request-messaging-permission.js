import {database, messaging} from './dataApi'

export default user => {
  messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(token => {
       database
         .ref('users')
         .child(user.uid)
         .child('token')
         .set(token)
      })
    .catch(console.error)
}
