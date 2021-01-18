const initialNotification = ''
let timeout

export const setNotification = (notification, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification,
        })

        if(timeout){
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: initialNotification,
            })
        }, time)
    }
}

const notificationReducer = (state = initialNotification, action) => {
    
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default notificationReducer