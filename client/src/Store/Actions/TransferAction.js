
import * as Types from '../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const transferActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/user/transfers')
        .then(info => {
            let newData = info.data.transferData.map(item => {
                return ({
                    col1: item.username,
                    col2: item.transferToId,
                    col3: item.transferFromId,
                    col4: item.amount,
                    col5: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col6: item.accountStatus,
                })
            })
            dispatch({
                type: Types.GET_TRANSFER_INFO, payload: {
                    transferData: newData
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_TRANSFER_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }else{
                return dispatch({
                    type: Types.GET_TRANSFER_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })
            }
        })
}



