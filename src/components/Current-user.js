import React, { PropTypes } from 'react';
import './Current-user.css';

const CurrentUser = ({displayName, photoURL}) => {
  return (
    <div className="CurrentUser">
      {photoURL &&
        <img
          className="CurrentUser--photo"
          src={photoURL}
          alt={displayName}
        />
      }
      {displayName && <h3 className="CurrentUser--displayName">{displayName}</h3>}
    </div>
  );
};

CurrentUser.propTypes = {
  photoURL: PropTypes.string,
  displayName: PropTypes.string
};

export default CurrentUser;