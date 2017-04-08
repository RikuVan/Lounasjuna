importScripts('https://www.gstatic.com/firebasejs/3.7.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.7.4/firebase-messaging.js')

const config = {messagingSenderId: '984108222515'}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
  const title = payload.title
  const options = {
    body: payload.body,
    icon: payload.icon
  }
  self.registration.showNotification(title, options)
})