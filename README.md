# React/Redux Workshop App: Lounasjuna

This project was bootstrapped with Create React App.

You can find the most recent version of this guide with how to perform common tasks here: [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Setup before the workshop

### Installations

- A recent version of [Node.js](https://nodejs.org/en/)
- `npm install -g create-react-app`
- `npm install -g firebase-tools`
- Optional: [Yarn](https://yarnpkg.com/en/)
- Optional: [Nvm](https://github.com/creationix/nvm)

### Firebase

- Sign up for a [Firebase account](https://console.firebase.google.com/) and create a new project called Lounasjuna.
- Choose Authentication → Sign-in method and enable Google authentication. Choose the popup for the login method.
- In authentication choose `WEB SETUP` in the upper right hand corner. This will open a modal with your unique configuration.
- Copy the config and add it to a file in the `src` folder of your app called `secrets.js`:
```javascript
  export default {
    firebaseConfig: {
      apiKey: "your_unique_key",
      authDomain: "your_auth domain",
      databaseURL: "https://lounasjuna-your_stuff.firebaseio.com",
      projectId: "your_project_id",
      storageBucket: "lounasjuna-your_stuff.appspot.com",
      messagingSenderId: "your_id"
    }
  }
```
- Seed the database using the `Import JSON` button in the upper right hand corner of the database. `seed.json` is at the root of the project.
- Initially remove restrictions on reading and writing to the datebase until you have
authentication hooked up. Database → Rules
```json
  {
    "rules": {
      ".read": "true",
      ".write": "true"
    }
  }
```
  DO NOT FORGET TO RETURN THE RESTRICTIONS LATER!
  This is still naive but better
  ```json
    {
      "rules": {
        ".read": "true",
        "restaurants": {
            ".write": "auth !== null"
        },
        "users": {
          "$userId": {
            ".write": "$userId === auth.uid"
          }
        }
      }
    }
  ```
### App

- Entry point is App.js
- Each page/feature has its own directory under `/views` together with its css and tests
- Generic, reusable components are placed in the `/components` directory
- Feel free to reorganize

### ES6 features it helps to be familiar with

#### Arrow functions
  Instead of
  ```javascript
  setTimeout(function(){ return console.log("USPA!").bind(this)}, 1000);
  ```
  we can stop worrying about `this` and do
  ```javascript
  setTimeout(() => console.log("USPA!"), 1000);
  ```
  And to get even more concise, instead of
  ```javascript
  const makeUspaObject = () => {
    return {
      name: "USPA",
      style: "80s"
    }
  }
  ```
  we can do this
  ```javascript
  const makeUspaObject = () => ({
    name: "USPA",
    style: "80s"
  })
  ```
#### Descructuring assignment
  Instead of
  ```javascript
  const name = data.transaction.name;
  const age = data.transaction.age;
  ```
  we can do this
  ```javascript
  const {name, age} = data.transaction;
  ```
And notice we use `const` these days instead of `var`, unless you are going to reassign the variable, in which case use `let`
  
#### Object spread operator
  Instead of creating a new object from one or more objects this way
  ```javascript
  const newUspaObject = _.merge(_.clone(uspaObject1), uspaObject2))
  ```
  or this way
  ```javascript
  const newUspaObject = Object.assign({}, uspaObject1, uspaObject2)
  ```
  we can do this
  ```javascript
  const newUspaObject = {...uspaObject, ...uspaObject2}
  ```

Additionally you may want to checkout [classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) and [modules](http://2ality.com/2014/09/es6-modules-final.html)
  
### Deployment

Firebase will also host your app for free. It is super simple to set up.

Assuming you already have already done `npm install -g firebase-tools`, do the following:
 
1. Run `firebase init` in the terminal. It will ask you about what services you want. Choose them all.
Also, make sure you answer as follows:
  ```
  ? What do you want to use as your public directory? build
  ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
  ```
2. Add/edit the `database.rules.json` with the same config you added in the firebase console
3. `npm run deploy` will install npm modules, build the production bundle, and deploy to firebase

Partial updates can be made with the --add flag: firebase --add /functions deploy
