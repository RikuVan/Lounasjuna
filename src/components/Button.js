import React, {PropTypes} from 'react'
import './Button.css'

const Button = ({type, onClick, children}) => (
  <button
    className={`Button ${type && type}`}
    onClick={onClick}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Button
