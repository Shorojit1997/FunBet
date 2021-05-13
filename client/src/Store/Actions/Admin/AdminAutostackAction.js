
import * as Types from '../../Types'
import axios from 'axios'

export const adminStckActionHandeler = ({questionId}) => async (dispatch) => {
    axios.get(`/api/admin/bets/autostack/${questionId}`)
        .then(info => {
            let stackName = info.data.stack;
            dispatch({
                type: Types.ADMIN_STACK,
                 payload: {
                    stack: stackName
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_STACK_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_STACK_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



