import React, {PropTypes} from 'react'
import Loading from './Loading'
import Button from './Button'

const getButtonContent = (type, loading) => {
  if (loading) {
    return <Loading small={true} />
  } else if (type === 'SignIn') {
    return (
      <span>
        <i className="fa fa-sign-in" /> Kirjaudu sisään
      </span>
    )
  }
  return (
    <span>
      <i className="fa fa-sign-out" /> Kirjaudu ulos
    </span>
  )
}

const SignInOrOut = ({type = 'SignIn', loading, onClickHandler}) => {
  return (
    <div className="SignInOut">
      <Button
        className={`block ${type === 'SignOut' ? 'destructive' : ''}`}
        onClick={onClickHandler}
        type="white"
      >
        {getButtonContent(type, loading)}
      </Button>
    </div>
  )
}

SignInOrOut.propTypes = {
  type: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default SignInOrOut
