
import * as Types from '../../Types'
import axios from 'axios'

export const adminClubReceiveActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/club/receive_message')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.ADMIN_CLUB_RECEIVE_MESSAGE, payload:{
                    receivelist:info.data.receiveMessage
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_CLUB_MESSAGE_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_CLUB_MESSAGE_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}

export const adminClubSendActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/club/send_message')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.ADMIN_CLUB_SEND_MESSAGE, payload:{
                    sendlist:info.data.sendMessage
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_CLUB_MESSAGE_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_CLUB_MESSAGE_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}
