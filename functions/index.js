const functions = require('firebase-functions')
const admin = require('firebase-admin')
const rp = require('request-promise')

/**
 * Post a message to Slack about the new GitHub commit.
 */
const postToSlack = (author, restaurant) => {
  const appUrl = 'https://lounasjuna-3c525.firebaseapp.com/'
  console.log(functions.config().slack.webhook.url)
  return rp({
    method: 'POST',
    // TODO: Configure the `slack.webhook_url` Google Cloud environment variables.
    // firebase functions:config:set slack.webhook.url="https://hooks.slack.com/services/..."
    // external requests require a Firebase account with a credit card :/
    uri: functions.config().slack.webhook.url,
    body: {
      text: `${author.displayName} on valinnut: ${restaurant.name}\n<${appUrl}|Millä lounasjunalla sinä menet?>`
    },
    json: true
  });
}

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
        postToSlack(author, restaurant).then(res => {
          res.end()
        }).catch(console.error)
        admin.messaging().sendToDevice(tokens, payload).catch(console.error)
      }
    })
  })

