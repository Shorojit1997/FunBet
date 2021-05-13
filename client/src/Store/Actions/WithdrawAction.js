
import * as Types from '../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const withdrawActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/user/withdraws')
        .then(info => {
            let newData = info.data.withdrawData.map(item => {
                return ({
                    col1: item.method,
                    col2: item.accountType,
                    col3: item.transferTo,
                    col4: item.amount,
                    col5: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col6: item.accountStatus,
                })
            })
            dispatch({
                type: Types.GET_WITHDRAW_INFO, payload: {
                    withdrawData: newData
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_WITHDRAW_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }else{
                return dispatch({
                    type: Types.GET_WITHDRAW_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



