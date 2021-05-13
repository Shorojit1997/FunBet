
import * as Types from '../../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const adminTransferActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/transfers')
        .then(info => {
            let transferPending = info.data.transferPending.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.transferToId,
                    col4: item.transferFromId,
                    col5: item.amount,
                    col6: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col7: item.accountStatus,
                    col8: item._id,
                })
            })


            let transferAccepted = info.data.transferAccepted.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.transferToId,
                    col4: item.transferFromId,
                    col5: item.amount,
                    col6: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col7: item.accountStatus,
                    col8: item._id,
                })
            })


            let transferRejected = info.data.transferRejected.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.username,
                    col3: item.transferToId,
                    col4: item.transferFromId,
                    col5: item.amount,
                    col6: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col7: item.accountStatus,
                    col8: item._id,
                })
            })


            dispatch({
                type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                    transferPending: transferPending,
                    transferAccepted: transferAccepted,
                    transferRejected: transferRejected,
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_GET_TRANSFER_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })

            }
            else {
                return dispatch({
                    type: Types.ADMIN_GET_TRANSFER_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })

            }
        })
}



