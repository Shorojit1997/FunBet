
import * as Types from '../../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const adminWithdrawActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/withdraws')
        .then(info => {
            let withdrawPending = info.data.withdrawPending.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.accountType,
                    col5: item.transferTo,
                    col6: item.amount,
                    col7: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col8: item.accountStatus,
                    col9: item._id,
                })
            })


            let withdrawAccepted = info.data.withdrawAccepted.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.accountType,
                    col5: item.transferTo,
                    col6: item.amount,
                    col7: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col8: item.accountStatus,
                    col9: item._id,
                })
            })


            let withdrawRejected = info.data.withdrawRejected.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.method,
                    col4: item.accountType,
                    col5: item.transferTo,
                    col6: item.amount,
                    col7: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col8: item.accountStatus,
                    col9: item._id,
                })
            })


            dispatch({
                type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                    withdrawPending: withdrawPending,
                    withdrawAccepted: withdrawAccepted,
                    withdrawRejected: withdrawRejected,
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })
            }
        })
}



