import React, {PropTypes} from 'react'
import './Restaurants.css'
import StarRating from '../../components/Star-rating'
import Button from '../../components/Button'
import RestaurantVotes from './Restaurant-votes'

const mapToUsers = (votes = [], users = {}) =>
  votes.map(id => users[id].displayName)

const RestaurantCard = (
  {
    name,
    address,
    link,
    rating,
    type,
    userId,
    uid: restaurantId,
    votes = [],
    users,
    handleSelect,
    currentVote,
  },
) => {
  return (
    <article className="Restaurant">
      <h2 className="Restaurant-name">
        {link &&
          <a href={link} className="Restaurant-www">
            <span className="fa fa-home" />
          </a>}
        {name}
      </h2>
      <div className="Restaurant-content">
        <StarRating rating={rating ? Math.round(rating) : 0} />
        <p>{type}</p>
        <p>{address}</p>
        {userId && <RestaurantVotes votes={mapToUsers(votes, users)} />}
      </div>
      {userId &&
        <div className="Restaurant-footer">
          <Button
            disabled={currentVote === restaurantId}
            onClick={() => handleSelect(userId, restaurantId)}
          >
            Lähden junaan mukaan
          </Button>
        </div>}
    </article>
  )
}

RestaurantCard.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  link: PropTypes.string,
  rating: PropTypes.string,
  type: PropTypes.string,
  votes: PropTypes.array,
  userId: PropTypes.string,
  uid: PropTypes.string,
  users: PropTypes.object.isRequired,
  currentVote: PropTypes.string,
}

export default RestaurantCard
