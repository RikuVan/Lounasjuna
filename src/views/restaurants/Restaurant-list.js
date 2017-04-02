import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import RestaurantCard from './Restaurant-card';
import Loading from '../../components/Loading';
import {fetchRestaurants} from '../../actions/restaurants'
import {vote, revokeVote} from '../../actions/voting'
import './Restaurants.css';

class Restaurants extends Component {

  // data usually fetched here, called once
  componentDidMount() {
    this.props.fetchRestaurants();
    //instead of binding the action to the component props
    //you could just import dispatch and use
    //it directly dispatch(fetchRestaurants());
  }

  handleSelect = (userId, restaurantId) => this.props.vote(userId, restaurantId)

  handleCancel = (userId, restaurantId) => this.props.revokeVote(userId, restaurantId)

  render () {
    const {restaurants, auth, users, currentVote} = this.props
    return (
      <section className="Restaurants">
        {restaurants.loading || users.loading ?
          <div className="Restaurants-loader">
            <Loading />
          </div> :
          (restaurants.data || []).map((rest, i) =>
            <RestaurantCard
              key={i}
              userId={auth.uid}
              users={users.data}
              handleSelect={this.handleSelect}
              handleCancel={this.handleCancel}
              currentVote={currentVote}
              {...rest}
            />
        )}
      </section>
    )
  }
}

Restaurants.propTypes = {
  restaurants: PropTypes.object,
  fetchRestaurants: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  revokeVote: PropTypes.func.isRequired,
  currentVote: PropTypes.string
};

//note this selector which computes a prop will be run everytime props update,
//this could be an expensive operation for a lot of data, in which case you
//may want to memoize it
const getCurrentVote = (restaurants, id) => {
  const vote = restaurants.filter(r => r.votes && r.votes.includes(id))
  return vote[0] ? vote[0].uid : null;
}
//in the second params allows us to get props passed down into this component from a parent
const mapStateToProps = (state, ownProps) => {
  const restaurants = state.requests.restaurants || {}
  const users = state.requests.users || {}
  const currentVote = restaurants.data ?
    getCurrentVote(restaurants.data, ownProps.auth.uid) : null
  return {restaurants, users, currentVote}
}

//react-redux provides a bindActionCreators func to do make this more concise
//when you have many action creators to bind to
const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
  vote: (userId, restaurantId) => dispatch(vote(userId, restaurantId)),
  revokeVote: (userId, restaurantId) => dispatch(revokeVote(userId, restaurantId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)
