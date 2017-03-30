import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import RestaurantCard from './Restaurant-card';
import {fetchRestaurants} from '../../actions/restaurants'
import './Restaurants.css';

class Restaurants extends Component {

  //typically data fetching done in this method
  componentWillMount() {
    //could also directly call apI
    this.props.fetchRestaurants();
  }

  render () {
    console.log(this.props);
    const {restaurants} = this.props
    return (
      <section className="Restaurants">
        {
          JSON.stringify(restaurants, null, 0)
        }
      </section>
    )
  }
}

Restaurants.propTypes = {
  restaurants: PropTypes.object,
  fetchRestaurants: PropTypes.func.isRequired
};

//or use () => ({}) for more concise function
const mapStateToProps = state => {
  return {
    restaurants: state.requests.restaurants,
  }
}

//react-redux provides a bindActionCreators func to do make this more concise,
//particularly with many actions
const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants() {
      return () => dispatch(fetchRestaurants())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)