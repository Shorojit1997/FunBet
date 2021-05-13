
import * as Types from '../../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const adminDepositActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/deposits')
        .then(info => {
            let depositPending = info.data.depositPending.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.transferTo,
                    col5: item.transferFrom,
                    col6: item.amount,
                    col7: item.transactionId,
                    col8: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col9: item.accountStatus,
                    col10: item._id,
                })
            })


            let depositAccepted = info.data.depositAccepted.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.transferTo,
                    col5: item.transferFrom,
                    col6: item.amount,
                    col7: item.transactionId,
                    col8: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col9: item.accountStatus,
                    col10: item._id,
                })
            })


            let depositRejected = info.data.depositRejected.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.transferTo,
                    col5: item.transferFrom,
                    col6: item.amount,
                    col7: item.transactionId,
                    col8: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col9: item.accountStatus,
                    col10: item._id,
                })
            })


            dispatch({
                type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                    depositPending: depositPending,
                    depositAccepted: depositAccepted,
                    depositRejected: depositRejected,
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



