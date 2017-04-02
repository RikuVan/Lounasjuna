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
   name,
   ...rest
}) => {
  const labelStyles = classNames(
    'Restaurant-form__label',
    {'Restaurant-form__label--required': required}
  )
  const fieldStyles = classNames(
    'Restaurant-form__field',
    {'Restaurant-form__field--short': short}
  )
  return (
    <div className="Restaurant-form__row">
      <label
        className={labelStyles}
        htmlFor={name}>
        {label || name}
      </label>
      <div className={fieldStyles}>
        <input
          className={classNames('Restaurant-form__input', {'Restaurant-form__input_error': (touched && error)})}
          {...input}
          name={name}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {(touched && error) &&
          <div className="Restaurant-form__error">
            {error}
          </div>
        }
      </div>
    </div>
  )
}

renderField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.type,
  meta: PropTypes.object,
  short: PropTypes.bool
}

const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

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
          label="Paikan nimi"
          name="name"
          type="text"
          placeholder="Pepe's pizza"
          required
        />
        <Field
          component={renderField}
          label="Ruoanlaji"
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
          placeholder="0"
        />
        <div className="Restaurant-form__row">
          <Button
            disabled={invalid}
            htmlType="submit"
            className="Restaurant-form__submit"
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
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired
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
