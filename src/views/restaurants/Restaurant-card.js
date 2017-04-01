import React, {Component, PropTypes} from 'react'
import './Restaurants.css'
import StarRating from '../../components/Star-rating'
import RestaurantVotes from './Restaurant-votes'

const mapToUsers = (votes = [], users) =>
  votes.map(id => users[id].displayName)

class Restaurants extends Component {

  render () {
    const {
      name,
      address,
      link,
      rating,
      type,
      userId,
      restaurantId,
      votes,
      users
    } = this.props
    return (
      <article className="Restaurant">
        <h3 className="Restaurant--name"><a href={link}>{name}</a></h3>
        <StarRating rating={rating ? Math.round(rating) : 0} />
        <p>{type}</p>
        <p>{address}</p>
        {userId && <RestaurantVotes votes={mapToUsers(votes, users)} />}
      </article>
    );
  }
}

Restaurants.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  rating: PropTypes.string,
  type: PropTypes.string
};

export default Restaurants