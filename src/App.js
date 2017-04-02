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
import {Link} from 'react-router-dom'

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
          <div className="App-header">
            <Link to={'/'}>
              <h1 className="Logo">
                <div className="Logo-train">🚂</div>
                <div className="Logo-text">Lounasjuna</div>
              </h1>
            </Link>
          </div>
          {/******** START NAV *******/}
          <div className="App-subheader">
            {auth.status === 'SIGNED_IN' &&
              <div className="App-subheader-links">
                <ButtonLink path="/uusi" type="white">
                  <i className="fa fa-plus-circle" /> Lisää lounaspaikka
                </ButtonLink>
              </div>
            }
            <CurrentUser {...auth} />
            <SignInOrOut
              type={showSignIn ? 'SignIn' : 'SignOut'}
              onClickHandler={showSignIn ? this.handleSignIn : this.handleSignOut}
              loading={awaitingLogin}
            />
            <CurrentUser {...auth} />
            <Route path="/" exact render={() =>
              /**
               * react router provides a render method instead of just passing
               * as component, inside of which you can add logic and/or
               * pass props
               */
              auth.status === 'SIGNED_IN' ?
                <ButtonLink className="Nav--button" path="/lounaspaikka/uusi">
                  {'Lisää lounaspaikka'}
                </ButtonLink> : null
                }
            />
            <Route path="/lounaspaikka/" render={() =>
                <ButtonLink className="Nav--button" path="/">
                  {'Pääsivu'}
                </ButtonLink>
              }
            />
          </div>
          {/******** END NAV *******/}
          {/****** START CONTENT ******/}
          <div className="App-content">
            <Switch>
              <Route
                path="/"
                exact
                render={() =>
                  <RestaurantList auth={auth} />
                }
              />
              <Route
                path="/lounaspaikka/uusi"
                render={({history}) => {
                  /***
                   *  here react router gives us the history object
                   *  which allows us to perform programmatic routing
                   *  in the form component using 'push'
                   */

                  if (auth.status === 'SIGNED_IN') {
                    return <RestaurantForm history={history}/>
                  } else {
                    return <RestaurantList auth={auth}/>
                  }
                }}
              />
              <Route path="/" render={() => <h3>404</h3>} />
            </Switch>
          </div>
          {/******* END CONTENT *******/}
        </div>
      </Router>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
