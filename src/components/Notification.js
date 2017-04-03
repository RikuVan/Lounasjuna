import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import TransitionGroup from 'react-addons-css-transition-group'
import './Notification.css'

const Notification = ({id, message}) => (
  <div className={`Notification Notification--${id}`}>
    <div className="Notification__message">
      {message}
    </div>
  </div>
)

class Notifier extends Component {
  render () {
    const notifications = this.props.notifications
    const current = Object.keys(notifications)
    if (current.length === 0) return null
    return (
      <div className="Notification__container">
        {current.map((key, i) => (
          <TransitionGroup
            key={i}
            transitionName="Notification-transition"
            transitionEnterTimeout={600}
            transitionExitTimeout={600}
          >
            <Notification
              key={i}
              id={key}
              message={notifications[key].message}
            />
          </TransitionGroup>
        ))}
      </div>
    )
  }
}

Notifier.propTypes = {
  key: PropTypes.string,
  message: PropTypes.string,
}

const mapStateToProps = state => ({notifications: state.notifications})

export default connect(mapStateToProps)(Notifier)
