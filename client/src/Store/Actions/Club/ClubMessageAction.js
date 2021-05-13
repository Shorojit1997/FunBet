
import * as Types from '../../Types'
import axios from 'axios'

export const ClubSendMessageAction = (history) => async (dispatch) => {
    axios.get('/api/club/message/send')
        .then(info => {
            dispatch({
                type: Types.CLUB_SEND_MESSAGE, payload: {
                    messagelist: info.data.messagelist
                }
            })
        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.CLUB_MESSAGE_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }else{
                return dispatch({
                    type: Types.CLUB_MESSAGE_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}
export const ClubReceiveMessageAction = (history) => async (dispatch) => {
    axios.get('/api/club/message/receive')
        .then(info => {
            dispatch({
                type: Types.CLUB_RECEIVE_MESSAGE, payload: {
                    messagelist: info.data.messagelist
                }
            })
        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.CLUB_MESSAGE_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }else{
                return dispatch({
                    type: Types.CLUB_MESSAGE_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



