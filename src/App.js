import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  attemptSignInWithGoogle,
  cancelGoogleAuth
} from './actions/auth'
import {fetchUsers} from './actions/users'
import logo from './logo.svg'
import './App.css'
import RestaurantList from './views/restaurants/Restaurant-list'
import SignInOrOut from './components/Sign-in-out'
import CurrentUser from './components/Current-user'

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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lounasjuna</h2>
        </div>
        <div className="App-subheader">
          <SignInOrOut
            type={showSignIn ? 'SignIn' : 'SignOut'}
            onClickHandler={showSignIn ? this.handleSignIn : this.handleSignOut}
            loading={awaitingLogin}
          />
          <CurrentUser {...auth} />
        </div>
        <RestaurantList auth={auth} />
      </div>
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
