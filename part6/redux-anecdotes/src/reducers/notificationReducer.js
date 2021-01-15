const initialNotification = ''

export const setNotification = (notification, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification,
        })

        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: initialNotification,
            })
        }, time)
    }
}

const notificationReducer = (state = initialNotification, action) => {
    console.log('notification state now: ', state)
    console.log('notification action', action)
    
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default notificationReducer