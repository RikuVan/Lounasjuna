import React, {PropTypes} from 'react'
import './Button.css'

const Button = ({
  children,
  className,
  htmlType,
  onClick,
  type
}) => (
  <button
    className={`Button ${type ? 'Button-' + type : ''} ${className && className}`}
    onClick={onClick}
    type={htmlType}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  htmlType: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
