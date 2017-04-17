import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import RestaurantCard from './Restaurant-card'
import withSpinner from '../../components/withSpinner'
import {fetchRestaurants} from '../../actions/restaurants'
import {vote, revokeVote} from '../../actions/voting'
import './Restaurants.css'

const RestaurantList = props => (
  <section className="Restaurants">
    {props.restaurants.data.map((rest, i) => (
      <RestaurantCard
        key={i}
        userId={props.auth.uid}
        users={props.users.data}
        handleSelect={props.handleSelect}
        currentVote={props.currentVote}
        {...rest}
      />
    ))}
  </section>
)

RestaurantList.propTypes = {
  restaurants: PropTypes.object,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  currentVote: PropTypes.string,
}

const RestaurantListWithSpinner = withSpinner(['restaurants', 'users'])(RestaurantList)

class Restaurants extends Component {
  // data usually fetched here, called once
  componentDidMount() {
    this.props.fetchRestaurants()
    //instead of binding the action to the component props
    //you could just import dispatch and use
    //it directly dispatch(fetchRestaurants());
  }

  handleSelect = (userId, restaurantId) => {
    const onSuccess = this.props.vote(userId, restaurantId)
    //if a the user has already voted, we first remove the vote and
    //then add the new vote by giving it has a callback to the revokeVote action
    //this is one pattern for handling sequential async actions, such as
    //sending a success notification after saving
    if (this.props.currentVote) {
      return this.props.revokeVote(userId, this.props.currentVote, onSuccess)
    }
    onSuccess()
  };

  render() {
    return (
      <RestaurantListWithSpinner
        handleSelect={this.handleSelect}
        {...this.props}
      />
    )
  }
}

Restaurants.propTypes = {
  fetchRestaurants: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  revokeVote: PropTypes.func.isRequired,
  currentVote: PropTypes.string,
}

//note this selector which computes a prop will be run everytime props update,
//this could be an expensive operation for a lot of data, in which case you
//may want to memoize it
const getCurrentVote = (restaurants, id) => {
  const vote = restaurants.filter(r => r.votes && r.votes.includes(id))
  return vote[0] ? vote[0].uid : null
}
//in the second params allows us to get props passed down into this component from a parent
const mapStateToProps = (state, ownProps) => {
  const restaurants = state.requests.restaurants || {}
  const users = state.requests.users || {}
  const currentVote = restaurants.data
    ? getCurrentVote(restaurants.data, ownProps.auth.uid)
    : null
  return {restaurants, users, currentVote}
}

//react-redux provides a bindActionCreators func to do make this more concise
//when you have many action creators to bind to
const mapDispatchToProps = dispatch => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
  vote: (userId, restaurantId) => dispatch(vote(userId, restaurantId)),
  revokeVote: (userId, restaurantId) =>
    dispatch(revokeVote(userId, restaurantId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)
