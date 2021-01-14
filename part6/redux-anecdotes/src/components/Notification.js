import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const hideStyle = {display: 'none'}

  return (
    <div style={notification ? style : hideStyle}>
      {notification}
    </div>
  )
}

export default Notification