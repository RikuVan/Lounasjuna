import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import RestaurantCard from './Restaurant-card';
import Loading from '../../components/Loading';
import {fetchRestaurants} from '../../actions/restaurants'
import './Restaurants.css';

class Restaurants extends Component {

  // data usually fetched here, called once
  componentDidMount() {
    this.props.fetchRestaurants();
    //instead of binding the action to the component props
    //you could just import dispatch and use
    //it directly dispatch(fetchRestaurants());
  }

  render () {
    const {restaurants} = this.props
    return (
      <section className="Restaurants">
        {restaurants.loading ?
          <Loading /> :
          (restaurants.data || []).map((rest, i) =>
            <RestaurantCard
              key={i}
              {...rest}
            />
        )}
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
    restaurants: state.requests.restaurants || {},
  }
}

//react-redux provides a bindActionCreators func to do make this more concise
//when you have many action creators to bind to
const mapDispatchToProps = dispatch => (
  {fetchRestaurants: () => dispatch(fetchRestaurants())});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)