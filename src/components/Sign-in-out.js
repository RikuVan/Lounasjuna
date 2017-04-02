import React, { PropTypes } from 'react'
import './Sign-in-out.css'
import Loading from './Loading'

const getButtonContent = (type, loading) => {
  if (loading) {
    return <Loading small={true} />
  } else if (type === 'SignIn') {
    return 'Kirjaudu sisään'
  }
  return 'Kirjaudu ulos'
}

const SignInOrOut = ({type = 'SignIn', loading, onClickHandler}) => {
  return (
    <div className="SignInOut">
      <button
        className={`block ${type === 'SignOut' ? 'destructive' : ''}`}
        onClick={onClickHandler}
      >
        {getButtonContent(type, loading)}
      </button>
    </div>
  );
};

SignInOrOut.propTypes = {
  type: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SignInOrOut
