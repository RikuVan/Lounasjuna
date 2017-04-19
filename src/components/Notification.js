import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {getNotifications} from '../ducks/notifications'
import TransitionGroup from 'react-addons-css-transition-group'
import './Notification.css'

const TRANSLATIONS = {
  LOGGED_IN: 'Kirjautuminen onnistui',
  LOGGED_OUT: 'Kirjauduttiin ulos',
}

const translate = value => TRANSLATIONS[value] || value

const Notification = ({id, message}) => (
  <div className={`Notification Notification--${id}`}>
    <div className="Notification__message">
      {message}
    </div>
  </div>
)

Notification.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
}

class Notifier extends Component {
  render() {
    const {notifications} = this.props
    const current = Object.keys(notifications)
    if (!current || current.length === 0) return null
    return (
      <div className="Notification__container">
        {current &&
          current.map(key => (
            <TransitionGroup
              key={key}
              transitionName="Notification-transition"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}
            >
              <Notification
                key={key}
                id={key}
                message={translate(notifications[key])}
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
  notifications: PropTypes.object,
}

const mapStateToProps = state => ({
  notifications: getNotifications(state)
})

export default connect(mapStateToProps)(Notifier)
