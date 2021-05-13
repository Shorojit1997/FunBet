
import * as Types from '../Types'
import axios from 'axios'


export const NotificationsAction = (history) => async (dispatch) => {
    axios.get('/api/user/notifications')
        .then(info => {
            
            dispatch({
                type: Types.GET_NOTIFICATIONS, payload: {
                    notifications: info.data.notifications
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.NOTIFICATIONS_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.NOTIFICATIONS_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



