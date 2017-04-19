import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './App.css'
import RestaurantList from './views/restaurants/Restaurant-list'
import SignInOrOut from './components/Sign-in-out'
import Button from './components/Button'
import CurrentUser from './components/Current-user'
import {attemptSignInWithGoogle, cancelGoogleAuth, isLoggedIn} from './ducks/auth'

export class App extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    attemptSignInWithGoogle: PropTypes.func,
    cancelGoogleAuth: PropTypes.func,
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

  /***
   * SPRINT 2
   * TODO: Use the CurrentUser component to add user info to your nav
   */

  render() {
    const {loggedIn} = this.props
    //const {auth} = this.props;
    //const showSignIn = auth.status === 'ANONYMOUS';
    //const awaitingLogin = auth.status === 'AWAITING_AUTH_RESPONSE';
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
          {/* TODO: CurrentUser needs data */}
          <CurrentUser />
          {/* TODO: Make sign in or out work */}
          <SignInOrOut
            type={loggedIn ? 'SignOut' : 'SignIn'}
            onClickHandler={this.handleSignIn}
          />
        </div>
        <div className="App-content">
          <RestaurantList />
        </div>
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
})

export default connect(mapStateToProps, {attemptSignInWithGoogle, cancelGoogleAuth})(App)
