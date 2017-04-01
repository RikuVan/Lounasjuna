import React, {PropTypes} from 'react'
import './Restaurants.css'
import StarRating from '../../components/Star-rating'
import Button from '../../components/Button'
import RestaurantVotes from './Restaurant-votes'

const mapToUsers = (votes = [], users = {}) =>
  votes.map(id => users[id].displayName)

const RestaurantCard = ({
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
   handleCancel,
   currentVote
 }) => {
  const isOnBoard = restaurantId === currentVote;
  //we can't vote for two different restaurants, so if we have voted already hide buttons
  //until we revoke that vote
  const hideButtons = currentVote && !isOnBoard;
  return (
    <article className="Restaurant">
      <h3 className="Restaurant--name"><a href={link}>{name}</a></h3>
      <StarRating rating={rating ? Math.round(rating) : 0} />
      <p>{type}</p>
      <p>{address}</p>
      {userId && <RestaurantVotes votes={mapToUsers(votes, users)} />}
      {!hideButtons && !isOnBoard &&
        <Button
          onClick={() => handleSelect(userId, restaurantId)}
          text='Lähden junalla mukaan'
        />
      }
      {!hideButtons && isOnBoard &&
        <Button
          type="destructive"
          onClick={() => handleCancel(userId, restaurantId)}
          text='En halua lähde mukaan'
        />
      }
    </article>
  );
}

RestaurantCard.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  rating: PropTypes.string,
  type: PropTypes.string,
  votes: PropTypes.array,
  userId: PropTypes.string,
  uid: PropTypes.string,
  users: PropTypes.object.isRequired
};

export default RestaurantCard