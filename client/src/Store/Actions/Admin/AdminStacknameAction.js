
import * as Types from '../../Types'
import axios from 'axios'

export const adminStcknameActionHandeler = () => async (dispatch) => {
    axios.get('/api/admin/bets/autostackname')
        .then(info => {
            let stackName = info.data.stackName;
            dispatch({
                type: Types.ADMIN_STACKNAME,
                 payload: {
                    stackName: stackName
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_STACKNAME_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_STACKNAME_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



