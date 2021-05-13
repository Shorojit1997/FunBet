
import * as Types from '../../Types'
import dateformat from 'dateformat'
import axios from 'axios'


export const adminNotificationsAction = (history) => async (dispatch) => {
    axios.get('/api/admin/notifications')
        .then(info => {
            let notifications = info.data.notifications.map((item,index) => {
                return ({
                    col1:index+1,
                    col2: item.title,
                    col3: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col4:{
                        _id:item._id,
                        title:item.title,
                        description:item.description,
                    }
                })
            })
            dispatch({
                type: Types.ADMIN_GET_NOTIFICATIONS, payload: {
                    notifications: notifications
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_NOTIFICATIONS_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_NOTIFICATIONS_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



