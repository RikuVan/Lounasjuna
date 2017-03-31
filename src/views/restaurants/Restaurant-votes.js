import React, {PropTypes} from 'react'
import './Restaurants.css';

const Votes = ({votes}) => {
  if (votes.length < 1) {
    return null;
  }
  return (
    <div className="Restaurant--votes">
      <div style={{padding: '5px'}}>
        <span className="Restaurant--votes-title">Junalla:{' '}</span>
        <span className="Restaurant--votes-voters">{votes.join(', ')}</span>
      </div>
    </div>
  )
}

Votes.propTypes = {
  votes: PropTypes.array
}

export default Votes;