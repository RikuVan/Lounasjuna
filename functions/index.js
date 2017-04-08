const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.newVoteAlert = functions.database.ref('/restaurants/{restaurantId}/votes/{userId}')
  .onWrite(event => {
    const userId = event.params.userId
    const restaurantId = event.params.restaurantId
    const getTokens = admin.database().ref('users').once('value')
      .then(snapshot => {
        const users = snapshot.val()
        return Object.keys(users)
          .filter(key => !!users[key].token)
          .map(key => users[key].token)
      })

    const getAuthor = admin.auth().getUser(userId)

    const getRestaurant = admin.database().ref(`restaurants/${restaurantId}`)
      .once('value')
      .then(snapshot => snapshot.val())

    Promise.all([getTokens, getAuthor, getRestaurant])
      .then(([tokens, author, restaurant]) => {
        //we will only send a message if it was a new, not deletion of the old
        const wasDeletion = !restaurant.votes || !restaurant.votes[userId]
        const payload = {
          notification: {
            title: `${author.displayName} on valinnut uuden junan!`,
            body: restaurant.name.toUpperCase(),
            icon: author.photoURL
          }
        }
      if (!wasDeletion && tokens.length > 0) {
        admin.messaging().sendToDevice(tokens, payload).catch(console.error)
      }
    })
  })
