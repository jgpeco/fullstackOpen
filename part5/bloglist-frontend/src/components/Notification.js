import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, messageType }) => {
    if(!message) return null

    return (
      <div className={`notification-${messageType}`}>
        {message}
      </div>
    )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
}

export default Notification