import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {addRestaurant} from '../../actions/restaurants'
import Button from '../../components/Button'
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
        <div className="Restaurant-form__row">
          <label
            className="Restaurant-form__label Restaurant-form__label--required"
            htmlFor="name"
          >
            Nimi
          </label>
          <Field
            className="Restaurant-form__field"
            component="input"
            name="name"
            type="text"
          />
        </div>
        <div className="Restaurant-form__row">
          <label
            className="Restaurant-form__label"
            htmlFor="type"
          >
            Tyyppi
          </label>
          <Field
            className="Restaurant-form__field"
            component="input"
            name="type"
            type="text"
          />
        </div>
        <div className="Restaurant-form__row">
          <label
            className="Restaurant-form__label Restaurant-form__label--required"
            htmlFor="address"
          >
            Katuosoite
          </label>
          <Field
            className="Restaurant-form__field"
            component="input"
            name="address"
            type="text"
          />
        </div>
        <div className="Restaurant-form__row">
          <label
            className="Restaurant-form__label"
            htmlFor="link"
          >
            Web-sivu
          </label>
          <Field
            className="Restaurant-form__field"
            component="input"
            name="link"
            type="url"
          />
        </div>
        <div className="Restaurant-form__row">
          <label
            className="Restaurant-form__label"
            htmlFor="rating"
          >
            Arvosana
          </label>
          <Field
            className="Restaurant-form__field Restaurant-form__field--short"
            component="input"
            max="5"
            min="1"
            name="rating"
            type="number"
          />
        </div>
        <div className="Restaurant-form__row">
          <Button
            className="Restaurant-form__submit"
            htmlType="submit"
          >
            Tallenna
          </Button>
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
