import React, {Component, PropTypes} from 'react'
import './Restaurants.css'
import StarRating from '../../components/Star-rating'

class Restaurants extends Component {

  render () {
    const {name, address, link, rating, type} = this.props
    return (
      <article className="Restaurant">
        <h3 className="Restaurant--name"><a href={link}>{name}</a></h3>
        <StarRating rating={rating ? Math.round(rating) : 0} />
        <p>{type}</p>
        <p>{address}</p>
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