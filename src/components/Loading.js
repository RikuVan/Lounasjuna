import React, {PropTypes} from 'react'
import './Loading.css'

const Loading = ({small}) => {
  return (
    <div className={small ? 'Loading--small' : 'Loading'}>
      Lataa…
    </div>
  )
}

Loading.propTypes = {
  small: PropTypes.bool
}

export default Loading;
