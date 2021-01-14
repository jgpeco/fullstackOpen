const initialNotification = ''

//action creators
export const showNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: notification
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

const notificationReducer = (state = initialNotification, action) => {
    console.log('notification state now: ', state)
    console.log('notification action', action)
    
    switch(action.type){
        case 'SHOW_NOTIFICATION':
            return action.data
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer