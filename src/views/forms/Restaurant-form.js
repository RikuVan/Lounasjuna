import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {addRestaurant} from '../../actions/restaurants'
import Button from '../../components/Button'
import './Restaurant-form.css'
import classNames from 'classnames'

const renderField = ({
   placeholder,
   required,
   input,
   label,
   type,
   meta: { touched, error },
   short,
   ...rest
}) => {
  const fieldStyles = classNames(
    'Restaurant-form__label',
    {'Restaurant-form__label--required': required,
      'Restaurant-form__field--short': short})
  return (
    <div className="Restaurant-form__row">
      <label
        className={fieldStyles}
        htmlFor={name}>
        {label}
      </label>
      <div>
        <input
          className="Restaurant-form__field"
          {...input}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {(touched && error) &&
          <span className=".Restaurant-form__error">
            {error}
          </span>
        }
      </div>
    </div>
  )
}

const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Pakollinen'
  }
  if (!values.address) {
    errors.address = 'Pakollinen'
  }
  if (values.link && !urlRegex.test(values.link)) {
    errors.link = 'Virhellinen url'
  }
  return errors
}

class RestaurantForm extends Component {

  submit = values => {
    this.props.addRestaurant(values);
    this.redirectHome()
  }

  redirectHome = () => this.props.history.push("/")

  render() {
    const {handleSubmit, invalid} = this.props;
    return (
      <form
        className="Restaurant-form"
        onSubmit={handleSubmit(this.submit)}
      >
        <Field
          component={renderField}
          label="nimi"
          name="name"
          type="text"
          placeholder="Pepe's pizza"
        />
        <Field
          component={renderField}
          label="Tyyppi"
          name="type"
          type="text"
          placeholder="Pizza"
        />
        <Field
          component={renderField}
          label="Katuosoite"
          name="address"
          type="text"
          placeholder="1 Hannulankatu, 33580 Tre"
          required
        />
        <Field
          component={renderField}
          label="Web-sivu"
          name="link"
          type="text"
          placeholder="https://pepes.com"
        />
        <Field
          component={renderField}
          label="Arvosana"
          name="rating"
          type="number"
          min="1"
          max="5"
          short
          placeholder="https://pepes.com"
        />
        <div className="Restaurant-form__row">
          <button
            disabled={invalid}
            className="Restaurant-form__submit"
            type="submit"
           >
            Tallenna
          </button>
        </div>
      </form>
    )
  }
}

RestaurantForm.propTypes = {
  addRestaurant: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}


//as a shortcut we can just give connect an object with a function instead
//of mapDispatchToProps and it will automagically bind it for us
const ConnectedRestaurantForm =
  connect(null, {addRestaurant})(RestaurantForm)

const DecoratedRestaurantForm = reduxForm({
  form: 'restaurant', // a unique name for this form
  validate
})(ConnectedRestaurantForm);

export default DecoratedRestaurantForm;
