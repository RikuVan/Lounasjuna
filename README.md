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
          ".write": "auth !== null && auth.provider == 'google'"
        },
        "users": {
          "$userId": {
            ".write": "$userId === auth.uid && auth.provider == 'google'"
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
  
### Sprint 1: DISPLAYING A RESTAURANT LIST (React)
  A user wants to see a list of all the available restaurants they can eat at. Each listing
  should have a name, an address, a link the restaurant's webpage, and a rating from 0-5.
#### TODOS:
  1. Make sure you are getting your restaurant data from your database in the correct
  lifecyle hook.
  2. Create a state object in your component to hold your restaurants.
  3. Make use of the Restaurant-card and Restaurant votes (inside the card) to display
  your restaurant data. Use map to create a card for each.

#### Resources:
  - [Redux Actions](https://facebook.github.io/react/docs/react-component.html)
  
  - [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
  
### Sprint 2: USING REDUX AND AUTHORIZING USERS (Redux connect, thunks, & action creators)
  The developer wants his components to be free of local state. All the apps
  data should be stored in a tree. The user wants to be able to log in and out
  of the app using his Google account.
#### TODOS:
  1. Add the two action type constants and two actions to actions/requests
  so that data will flow to your reducers. Look at the reducer for clues.
  2. Use connect and mapStateToProps to get your restaurants from redux, getting
  rid of the local state object in the component, and calling fetchRestaurants from
  the correct lifecycle method
  3. Add auth by adding three action types and action creators to the
  actions/auth file. Look at the reducer for clues.
  * AT THIS POINT MAKE SURE GOOGLE AUTH IS ENABLED IN YOUR FIREBASE CONSOLE
  4. There are three functions that are almost ready to log the user in with
  Google, log them out, and listen for changes. However, these functions do not
  dispatch the actions you created. Add the dispatches to these functions where they
  are needed.
  5. Make sure your App component is getting the auth data so you can detect
  whether a user is signed in and hide some content (e.g. voting buttons) if so. You
  will also want to display different texts in the button depending on whether
  they are logged in or out.
  6. Now make use to the sigin and out functions inside the App.js component so
  a user can sign in and out.
  
#### Resources:
  - [Redux Actions](http://redux.js.org/docs/basics/Actions.html)
    
  - [Redux with React and connect](http://redux.js.org/docs/basics/UsageWithReact.html)
    
  - [Redux thunk](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

### Sprint 3: VOTING (Redux reducers & middleware)
  A user wants to be able to login and see which users have voted
  for which restaurant. They also want to be able to vote for a restaurant themselves
  and, if needed, his old vote to be revoked.
  
  

### Sprint 4: ADDING RESTAURANT (Redux Form and React Router v.4)
  Authenticated users want to be able to add new restaurants. These new
  and be automatically redirected to the front page where the addition can be seen.
  They also want validation to make sure the correct data is entered in the right format.
#### TODOS:
  1. Use the Route component inside a Switch component to split our app
  into two routes in App.js, one for the restaurant list and another for a new 
  restaurant form
  2. The route component offers a render method in which we can check for
  authenication and only render the new restaurant form if logged in
  3. We can also use Route in the nav to conditionally show buttons, ie
  add a home button with the new restaurant path and a new restaurant button
  for the form
  4. Complete the redux form by adding the Field component and passing it the
  component add correct props. Make sure the input component gets all the props
  it needs from Field
  5. If you have time, add some validation the form by adding a validation function
  in the reduxForm component
  
### Resources:
  - [React Router v.4](https://reacttraining.com/react-router/web/guides/quick-start)
  
  - [Redux Form reduxForm](http://redux-form.com/6.6.3/docs/api/Props.md/)
  
  - [Redux Form Field Component](http://redux-form.com/6.6.3/docs/api/Field.md/)
  
  - [Redux Form sync validation](http://redux-form.com/6.6.3/examples/syncValidation/)

### Sprint 5: NOTIFYING USERS OF SUCCESS/FAILURE (Bonus - more Redux, yeah!)
  Users want verification that an action has succeeded or failed via a flash message
  displayed at the top of the viewport. They want to know, for example, that a restaurant
  has been successfully added or that logout has succeeded.
#### TODOS:
  1. Create a action(s) to show and dismiss flash notifications, for example
  when a restaurant is saved, when a user logs out etc.
  2. Create the reducer with a least two cases
  3. Hook up the ready component and state into the main view. Make sure it gets
  the props it needs somehow
  

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

- Partial updates can be made with the --add flag: `firebase --add /functions deploy`
