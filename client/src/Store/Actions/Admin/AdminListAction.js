
import * as Types from '../../Types'
import axios from 'axios'
import dateformat from 'dateformat'

export const adminDetailsActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/admindetails')
        .then(info => {
            let adminList = info.data.adminList.map((item, index) => {
                return ({
                    col1: index + 1,
                    col2: item.name,
                    col3: item.username,
                    col4: item.phone,
                    col5: item.email,
                    col6: item.role,
                    col7: dateformat(item.createdAt, "dd-mm-yy, h:MM TT"),
                    col8: item.activeStatus,
                    col9: {
                        _id: item._id,
                        role: item.role,
                        activeStatus: item.activeStatus,
                        username: item.username,
                        name: item.name,
                        email: item.email,
                        phone: item.phone
                    },
                })
            })
            dispatch({
                type: Types.ADMIN_LIST,
                payload: {
                    adminList: adminList
                }
            })
        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_LIST_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.ADMIN_LIST_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



