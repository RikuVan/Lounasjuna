import React, {PropTypes} from 'react';
import './Star-rating.css'

const ratingTitles = ['Välttävä', 'Tyydyttävä', 'Hyvä', 'Kiitettävä', 'Erinomainen!'];

/***
 * convert a number to a an array of values to map over li for each star
 * @param rating Number ie 3
 * @returns {Array.<*>} ie [1,2,3,0,0] for three stars
 */
const getStars = rating => {
  const blankStars = new Array(5 - rating).fill(0)
  return [...Array(rating).keys()].map(v => v + 1).concat(blankStars)
}

const StarRating = ({rating}) => (
  <div className='Star-rating'>
    <ul className='Star-rating--list'>
      {getStars(rating).map((val, i) =>
        <li key={i} className='Star-rating--star' title={ratingTitles[i]}>
          <i className={`fa fa-star fa-fw${!val ? '' : ' active'}`}></i>
        </li>
      )}
    </ul>
  </div>
)

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
}

export default StarRating
