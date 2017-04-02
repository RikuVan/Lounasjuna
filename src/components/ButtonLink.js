import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'

const ButtonLink = ({type, path, children, className}) => (
  <Link to={path} className={className}>
    <Button
      type={type}
    >
      {children}
    </Button>

  </Link>
)

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  path: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ButtonLink