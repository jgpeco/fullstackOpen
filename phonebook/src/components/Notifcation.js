import React from 'react'

const Notification = ({content}) => {
    const {message, type} = content
    if(message === '') return null

    
    return (
        <div className={`notification-${type}`}>
            {message}
        </div>
    )
}

export default Notification