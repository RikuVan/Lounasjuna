import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './App.css'
import RestaurantList from './views/restaurants/Restaurant-list'
import SignInOrOut from './components/Sign-in-out'
import Button from './components/Button'
import CurrentUser from './components/Current-user'
import Notifier from './components/Notification'
import {attemptSignInWithGoogle, cancelGoogleAuth, isLoggedIn, getUser} from './ducks/auth'

export class App extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    attemptSignInWithGoogle: PropTypes.func,
    cancelGoogleAuth: PropTypes.func,
    user: PropTypes.object,
  }
  /***
   * SPRINT 3
   * TODO: Use the correct lifecycle method to fetch users
   */

  handleSignIn = () => {
    if (this.props.loggedIn) {
      return this.handleSignOut()
    }
    this.props.attemptSignInWithGoogle()
  }

  handleSignOut = () => this.props.cancelGoogleAuth()

  render() {
    const {loggedIn, user} = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="Logo">
            <div className="Logo-train">🚂</div>
            <div className="Logo-text">Lounasjuna</div>
          </h1>
        </div>
        <div className="App-subheader">
          <div className="App-subheader-links">
            {/* TODO: change to a working ButtonLink */}
            <Button type="white" className="Nav--button">
              <i className="fa fa-plus-circle" />
              Lisää lounaspaikka
            </Button>
          </div>
          <CurrentUser user={user} />
          <SignInOrOut
            type={loggedIn ? 'SignOut' : 'SignIn'}
            onClickHandler={this.handleSignIn}
          />
        </div>
        <div className="App-content">
          <RestaurantList />
        </div>
        <Notifier />
      </div>
    )
  }
}

/**
 * SPRINT 3
 * TODO: connect to the redux store and hook up login/out with attemptSignInWithGoogle & cancelGoogleAuth.
 * You will need a mapStateToProps function, as well as some bound action creators.
 * The container page with also pass auth information to its children views to use.
 *
 * TODO: fetchUsers, get them in mapStateToProps and pass them to the restaurant view
 */

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state),
  user: getUser(state),
})

export default connect(mapStateToProps, {attemptSignInWithGoogle, cancelGoogleAuth})(App)
