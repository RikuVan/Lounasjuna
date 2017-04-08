const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.newVoteAlert = functions.database.ref('/restaurants/{restaurant}/votes/{vote}')
  .onWrite(event => {
    const vote = event.data.val()

    const getTokens = admin.database().ref('users').once('value')
      .then(snapshot => {
        const tokens = []
        snapshot.forEach(user => {
          const token = user.child('token').val()
          if (token) tokens.push(token)
          return tokens
        })
      })

    const getAuthor = admin.auth().getUser(vote)

    Promise.all([getTokens, getAuthor]).then([tokens, author] => {
      const payload = {
        title: `${author.displayName} has joined a train!"`,
        body: JSON.stringify(vote, null, 2),
        icon: author.photoURL
      }
    })

    admin.messaging().sendToDevice(tokens, payload).catch(console.error)
  })

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })
