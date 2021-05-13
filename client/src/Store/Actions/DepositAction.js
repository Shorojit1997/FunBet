
import * as Types from '../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const depositActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/user/deposits')
        .then(info => {
            let newData = info.data.depositData.map(item => {
                return ({
                    col1: item.method,
                    col2: item.transferTo,
                    col3: item.transferFrom,
                    col4: item.amount,
                    col5: item.transactionId,
                    col6: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col7: item.accountStatus,
                })
            })
            dispatch({
                type: Types.GET_DEPOSIT_INFO, payload: {
                    depositData: newData
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })
            }
        })
}



