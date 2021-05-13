
import * as Types from '../../Types'
import axios from 'axios'


export const adminUserDetailsActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/userdetails')
        .then(info => {
            let userList = info.data.userList;
            dispatch({
                type: Types.USER_LIST,
                payload: {
                    userList: userList
                }
            })
        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.USER_LIST_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.USER_LIST_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })
            }

        })
}



