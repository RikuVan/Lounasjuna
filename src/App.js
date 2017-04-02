import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {
  attemptSignInWithGoogle,
  cancelGoogleAuth
} from './actions/auth'
import {fetchUsers} from './actions/users'
import './App.css'
import RestaurantList from './views/restaurants/Restaurant-list'
import RestaurantForm from './views/forms/Restaurant-form'
import SignInOrOut from './components/Sign-in-out'
import CurrentUser from './components/Current-user'
import ButtonLink from './components/ButtonLink'

class App extends Component {

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleSignIn = () => this.props.attemptSignInWithGoogle()

  handleSignOut = () => this.props.cancelGoogleAuth()

  render() {
    const {auth} = this.props
    const showSignIn = this.props.auth.status === 'ANONYMOUS'
    const awaitingLogin = auth.status === 'AWAITING_AUTH_RESPONSE'
    return (
      <Router>
        <div className="App">
          <h1 className="Logo">
            <div className="Logo-train">🚂</div>
            <div className="Logo-text">Lounasjuna</div>
          </h1>
          <div className="App-subheader">
            <SignInOrOut
              type={showSignIn ? 'SignIn' : 'SignOut'}
              onClickHandler={showSignIn ? this.handleSignIn : this.handleSignOut}
              loading={awaitingLogin}
            />
            <CurrentUser {...auth} />
            {auth.status === 'SIGNED_IN' &&
              <div className="App-subheader--link">
                <ButtonLink path="/uusi">
                  {'Lisää lounaspaikka'}
                </ButtonLink>
              </div>}
          </div>
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                <RestaurantList auth={auth} />
              }
            />
            <Route
              path="/uusi"
              render={() => {
                if (auth.status === 'SIGNED_IN') {
                  return <RestaurantForm />
                } else {
                  return <RestaurantList auth={auth} />
                }
              }}
            />
            <Route path="/" render={() => <h3>404</h3>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  attemptSignInWithGoogle: PropTypes.func.isRequired,
  cancelGoogleAuth: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({auth: state.auth})

const mapDispatchToProps = dispatch => bindActionCreators({
  attemptSignInWithGoogle, cancelGoogleAuth, fetchUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
