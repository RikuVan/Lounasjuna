import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Loading from '../../components/Loading'
import {fetchRestaurants, getRestaurants, isLoading} from '../../ducks/restaurants'
// import {processRestaurantData} from '../../actions/helpers'
// import {DB} from '../../dataApi'
import RestaurantCard from './Restaurant-card'
import './Restaurants.css'

class Restaurants extends Component {
  static propTypes = {
    fetchRestaurants: PropTypes.func,
    loading: PropTypes.bool,
    restaurants: PropTypes.array,
  }

  componentDidMount() {
    /**
     * SPRINT 1:
     * TODO: save the restaurants returned from the database to component state
     * make sure this happens in the correct life cycle method
     * and display then in RestaurantCards
     */
    /* DB.restaurants()
      .once('value')
      .then(snapshot => processRestaurantData(snapshot.val()))
      .then(data => console.log(data)) */
    this.props.fetchRestaurants()
  }

  handleSelect = (/* userId, restaurantId */) => {
    /***
     * SPRINT 4
     * TODO: add the logic here for changing a vote
     * You will need to check whether the use has a current vote and
     * revoke it and then vote again, perhaps as a callback
     */
  };

  render() {
    const {loading, restaurants} = this.props
    return (
      <section className="Restaurants">
        <div className="Restaurants-loader">
          {loading ? <Loading /> :
            (restaurants || []).map(item => <RestaurantCard key={item.name} {...item} />)}
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
 * in mapDispatchToProps whether the current user has a vote
 */

const mapStateToProps = state => ({
  restaurants: getRestaurants(state),
  loading: isLoading(state),
})

export default connect(mapStateToProps, {fetchRestaurants})(Restaurants)
