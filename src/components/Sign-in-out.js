import React, { PropTypes } from 'react';
import './Sign-in-out.css';

const SignInOrOut = ({type = 'SignIn', onClickHandler}) => {
  return (
    <div className="signInOut">
      <button
        className={`block ${type === 'SignOut' ? 'destructive' : ''}`}
        onClick={onClickHandler}
      >
        {type === 'SignIn' ? 'Sign In' : 'Sign out'}
      </button>
    </div>
  );
};

SignInOrOut.propTypes = {
  type: PropTypes.string,
  onClickHandler: PropTypes.func
}

export default SignInOrOut
