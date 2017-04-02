import React, {PropTypes} from 'react'

const Button = ({type, onClick, text}) => (
  <button
    className={type ? type : 'default'}
    onClick={onClick}>
    {text}
  </button>
)

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Button