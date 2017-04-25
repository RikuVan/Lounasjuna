import React, {PropTypes} from 'react'
import './Restaurants.css'
import StarRating from '../../components/Star-rating'
import Button from '../../components/Button'
//import RestaurantVotes from './Restaurant-votes'

//Helper to add users to RestaurantVotes
//const mapToUsers = (votes = [], users = {}) =>
//votes.map(id => users[id].displayName)

/**
 * SPRINT 3
 * TODO: This panel takes a list of users in RestaurantsVote component
 * Change where the button is active depending on whether the user has voted for the restaurant
 * A vote function should be passed as prop to this dumb component to be used as a callback
 *
 */

export const RestaurantCard = (
  {
    name,
    address,
    link,
    rating,
    type,
  },
) => {
  return (
    <article className="Restaurant">
      <h2 className="Restaurant-name">
        {link &&
          <a href={link} className="Restaurant-www" target="_blank">
            <span className="fa fa-home" />
          </a>}
        {name}
      </h2>
      <div className="Restaurant-content">
        <StarRating rating={rating ? Math.round(rating) : 0} />
        <p>{type}</p>
        <p>{address}</p>
        {/*<RestaurantVotes votes={mapToUsers(votes, users)} />} */}
      </div>
      <div className="Restaurant-footer">
        <Button disabled={false} onClick={() => {}}>
          Lähden junaan mukaan
        </Button>
      </div>
    </article>
  )
}

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  link: PropTypes.string,
  rating: PropTypes.string,
  type: PropTypes.string,
}

export default RestaurantCard
