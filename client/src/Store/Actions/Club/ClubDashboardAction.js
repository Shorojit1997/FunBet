import axios from 'axios'
import * as Types from '../../Types'
export const clubDashboardAction = () => async (dispatch) => {

    axios.get('/api/club/dashboard')
        .then(info => {
            if (info) {
                dispatch({ type: Types.CLUB_DASHBOARD, payload:{
                    dashboard:info.data.dashboard
                }})
            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.CLUB_DASHBOARD_ERROR, payload: {
                    flashMessage:error.response.data.flashMessage
                } })
            }
            else {
                return dispatch({ type: Types.CLUB_DASHBOARD_ERROR, payload:{
                    flashMessage:'Internal server error'
                } })
            }
        })
}
