import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {addRestaurant} from '../../actions/restaurants'

import './Restaurant-form.css'


class RestaurantForm extends Component {

  submit = values => this.props.addRestaurant(values)

  render() {
    const {handleSubmit} = this.props;
    return (
      <form
        className="Restaurant-form"
        onSubmit={handleSubmit(this.submit)}
      >
        <div className="Restaurant-form--input">
          <label className="required" htmlFor="name">Nimi</label>
          <Field name="name" component="input" type="text"/>
        </div>
        <div className="Restaurant-form--input">
          <label htmlFor="type">Tyyppi</label>
          <Field name="type" component="input" type="text" />
        </div>
        <div className="Restaurant-form--input">
          <label className="required" htmlFor="address">Katuosoite</label>
          <Field name="address" component="input" type="text"/>
        </div>
        <div className="Restaurant-form--input">
          <label htmlFor="link">Web-sivu</label>
          <Field name="link" component="input" type="url"/>
        </div>
        <div className="Restaurant-form--input">
          <label htmlFor="rating">Arvo</label>
          <div className="input--number">
            <Field name="rating" component="input" min="1" max="5" type="number"/>
          </div>
        </div>
        <div className="Restaurant-form--input">
          <button className="Button Restaurant-form--submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    )
  }
}

RestaurantForm.propTypes = {
  addRestaurant: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

//as a shortcut we can just give connect an object with a function instead
//of mapDispatchToProps and it will automagically bind it for us
const ConnectedRestaurantForm = connect(null, {addRestaurant})(RestaurantForm)

const DecoratedRestaurantForm = reduxForm({
  form: 'restaurant' // a unique name for this form
})(ConnectedRestaurantForm);

export default DecoratedRestaurantForm;
