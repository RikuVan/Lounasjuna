import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import initialState from './initial-state'
//import newUser from './middleware/new-user'
import {listenToAuthChanges} from './actions/auth'

//allows asynchronous actions
const middleware = [thunk]
const enhancers = []
//install chrome extension for the redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers),
)
//this is a web socket emitting changes that are then dispatched to a reducer
store.dispatch(listenToAuthChanges())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
