import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'

const ButtonLink = ({type, path, text, className}) => (
  <Link to={path} className={className}>
    <Button
      type={type}
      text={text}
    />
  </Link>
)

ButtonLink.propTypes = {
  type: PropTypes.string,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ButtonLink