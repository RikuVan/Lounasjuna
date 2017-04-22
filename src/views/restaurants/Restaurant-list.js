import React, {Component, PropTypes} from 'react'
import Loading from '../../components/Loading'
import {processRestaurantData} from '../../actions/helpers'
import {DB} from '../../dataApi'
import './Restaurants.css'

class Restaurants extends Component {
  componentMayDoSomething() {
    /**
     * SPRINT 1:
     * TODO: save the restaurants returned from the database to component state
     * make sure this happens in the correct life cycle method
     * and display then in RestaurantCards
     */
    DB.restaurants()
      .once('value')
      .then(snapshot => processRestaurantData(snapshot.val()))
      .then(data => console.log(data))
  }

  handleSelect = (userId, restaurantId) => {
    /***
     * SPRINT 4
     * TODO: add the logic here for changing a vote
     * You will need to check whether the user has a current vote and
     * revoke it and then vote again, perhaps as a callback.
     * If you are using redux sagas, you can take care of the revoking in a saga.
     */
  };

  render() {
    return (
      <section className="Restaurants">
        <div className="Restaurants-loader">
          <Loading />
        </div>
      </section>
    )
  }
}

/**
 * SPRINT 2
 * TODO: Use connect and mapDispatchToProps to get restaurants,
 * You will also need to bind one action creator: fetchRestaurants
 */

/**
 * SPRINT 3
 * TODO: Add vote and revokeVote to for users to add voting
 * You will also need to add users from the database and calculate
 * (in mapDispatchToProps?) whether the current user has a vote.
 */

export default Restaurants
