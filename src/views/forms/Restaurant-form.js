import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addRestaurant} from '../../actions/restaurants';
import Button from '../../components/Button';
import './Restaurant-form.css';
import classNames from 'classnames';

const renderField = (
  //SPRINT 4
  //TODO: some key props here inject from the redux-form Field component are not missing
  //make sure what you need from the input and meta object gets passed down!
  {
    placeholder,
    required,
    label,
    type,
    short,
    name,
    ...rest
  },
) => {
  const labelStyles = classNames('Restaurant-form__label', {
    'Restaurant-form__label--required': required,
  });
  const fieldStyles = classNames('Restaurant-form__field', {
    'Restaurant-form__field--short': short,
  });
  return (
    <div className="Restaurant-form__row">
      <label className={labelStyles} htmlFor={name}>
        {label || name}
      </label>
      <div className={fieldStyles}>
        <input
          className={classNames('Restaurant-form__input', {
            'Restaurant-form__input_error': 'TODO: something from meta object here',
          })}
          name={name}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {/* TODO: make sure this error show conditionally, based on where the user has made an error*/}
        <div className="Restaurant-form__error">
          todo
        </div>
      </div>
    </div>
  );
};

renderField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.type,
  meta: PropTypes.object,
  short: PropTypes.bool,
};

//const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

/**
 * SPRINT 4
 * TODO: add a validation function here to validate,
 * required fields and the url using the regex above
 */

//const validate = () => {}

class RestaurantForm extends Component {
  submit = values => {
    /**
     *  SPRINT 4
     *  TODO: give you form values to the addRestaurant action creator and then use the redirectHome
     */
  };

  redirectHome = () => this.props.history.push('/');

  render() {
    /***
     * SPRINT 4
     * TODO: redux-form provides you with some form level props, use invalid to disable the button
     * if the form is invalid
     */
    //const {handleSubmit, invalid} = this.props;
    return (
      <form className="Restaurant-form" onSubmit={/*handleSubmit(this.submit)*/}>
        {/*
          SPRINT 4
          TODO: use the Field component from redux-form to create five inputs for your restaurant data,
           the field names should match those in your database
        */}
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
    );
  }
}

RestaurantForm.propTypes = {
  addRestaurant: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  //invalid: PropTypes.bool.isRequired,
};

//as a shortcut we can just give connect an object with a function instead
//of mapDispatchToProps and it will automagically bind it for us
const ConnectedRestaurantForm = connect(null, {addRestaurant})(RestaurantForm);

const DecoratedRestaurantForm = reduxForm({
  form: 'restaurant', // a unique name for this form
  // SPRINT 4
  //TODO: add some validation
})(ConnectedRestaurantForm);

export default DecoratedRestaurantForm;
