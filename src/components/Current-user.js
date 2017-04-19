import React, {PropTypes} from 'react'
import './Current-user.css'

const CurrentUser = ({user}) => {
  return (
    <div className="CurrentUser">
      {user && user.photoURL &&
        <img className="CurrentUser-photo" src={user.photoURL} alt={user.displayName} />}
      {user && user.displayName &&
        <div className="CurrentUser-displayName">{user.displayName}</div>}
    </div>
  )
}

CurrentUser.propTypes = {
  user: PropTypes.object,
}

export default CurrentUser
