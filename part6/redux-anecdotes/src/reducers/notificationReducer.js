const initialNotification = 'render here notification...'

const notificationReducer = (state = initialNotification, action) => {
    console.log('notification state now: ', state)
    console.log('notification action', action)
    
    switch(action.type){
        case 'SHOW_NOTIFICATION':
            return state
        case 'HIDE_NOTIFCATION':
            return state
        default:
            return state
    }
}

export default notificationReducer