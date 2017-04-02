import React, { PropTypes } from 'react';
import './Current-user.css';

const CurrentUser = ({displayName, photoURL}) => {
  return (
    <div className="CurrentUser">
      {photoURL &&
        <img
          className="CurrentUser-photo"
          src={photoURL}
          alt={displayName}
        />
      }
      {displayName && <div className="CurrentUser-displayName">{displayName}</div>}
    </div>
  );
};

CurrentUser.propTypes = {
  photoURL: PropTypes.string,
  displayName: PropTypes.string
};

export default CurrentUser;
