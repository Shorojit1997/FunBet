
import * as Types from '../../Types'
import axios from 'axios'

export const adminLiveUpcommingActionHandeler = () => async (dispatch) => {
    axios.get(`/api/admin/live_bets`)
        .then(info => {
            let upcommingBets = info.data.upcommingBets;
            dispatch({
                type: Types.ADMIN_UPCOMMING_BET,
                 payload: {
                    upcommingBets: upcommingBets
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_UPCOMMING_BET_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_UPCOMMING_BET_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



