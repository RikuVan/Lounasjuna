import React, {Component, PropTypes} from 'react'
import Restaurant from './Restaurant-card'
import './Restaurants.css'

class Restaurants extends Component {
  constructor(props) {
    super(props)
  }

  handleSelect = key => {
  }

  handleDeselect = key => {
  }

  render () {
    const {restaurants, user} = this.props
    return (
      <section className="Restaurants">
        {restaurants.map((rest, key) =>
          <Restaurant
            key={key}
            user={user}
            handleSelect={() => this.handleSelect(key)}
            handleDeselect={() => this.handleDeselect(key)}
            {...rest}
          />)
        }
      </section>
    );
  }
}

Restaurants.propTypes = {
  user: PropTypes.object,
  restaurants: PropTypes.object
};

export default Restaurants