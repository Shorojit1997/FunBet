
import * as Types from '../../Types'
import axios from 'axios'

export const adminAccouuntTypeActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/account_type')
        .then(info => {
            let newinfo = info.data.accountInfo.map(item => {
                return {
                    col1: item.accountName,
                    col2: item.accountNumber,
                    col3: item.accountActiveStatus,
                    col4: { _id: item._id, accountName: item.accountName, accountNumber: item.accountNumber }
                }
            })
            dispatch({
                type: Types.ADMIN_ACCOUNT_TYPE, payload: {
                    TypeInfo: newinfo
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_ACCOUNT_TYPE_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.ADMIN_ACCOUNT_TYPE_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }

        })
}



