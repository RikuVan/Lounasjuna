import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import initialState from './initial-state'
// import {listenToAuthChanges} from './actions/auth'
import rootSaga from './sagas'
import App from './App'
import './index.css'

// Instead of thunk middleware install saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const enhancers = []
//install chrome extension for the redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers),
)
// this is a web socket emitting changes that are then dispatched to a reducer
// store.dispatch(listenToAuthChanges())

// Remember to combine all sagas into a root saga and run it.
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
