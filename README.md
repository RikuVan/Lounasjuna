# React/Redux Workshop app: Lounasjuna

This project was bootstrapped with Create React App
You can find the most recent version of this guide with how to perform common tasks here: [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Setup before the workshop

### Installations

- A recent version of [Node.js](https://nodejs.org/en/)
- `npm install -g create-react-app`
- `npm install -g firebase-tools`
- Optional: [Yarn](https://yarnpkg.com/en/)
- Optional: [Nvm](https://github.com/creationix/nvm)

### Firebase

- Sign up for a [Firebase account](https://console.firebase.google.com/) and create a new project called Lounasjuna
- Choose Authentication > Sign-in method and enable Google authentication. Choose the popup for the login method.
- In authentication choose WEB SETUP in the upper right hand corner. This will open a modal with your unique configuration.
- copy the config and add it to a file in the root of your app called secrets.js:
  ```javascript
    firebaseConfig: {
       apiKey: "your_unqiue_key",
       authDomain: "your_auth domain",
       databaseURL: "https://lounasjuna-your_stuff.firebaseio.com",
       storageBucket: "lounasjuna-your_stuff.appspot.com",
       messagingSenderId: "your_id"
     }
  ```
- Initially remove restrictions on reading and writing to the datebase until you have
authentication hooked up. Database > Rules
  ```json
    {
      "rules": {
        ".read": "true",
        ".write": "true"
      }
    }
  ```
  DO NOT FORGET TO RETURN THE RESTRICTIONS LATER!

### App

-Each page/feature has its own directory under /Views together with its css and tests
-Generic, reusable components are placed in the components directory
-Feel free to reorganize

