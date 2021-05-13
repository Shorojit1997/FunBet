
import * as Types from '../../Types'
import axios from 'axios'

export const adminDashboardAction = () => async (dispatch) => {

    axios.get('/api/admin/dashboard')
        .then(info => {
            if (info) {
                dispatch({ type: Types.ADMIN_DASHBOARD, payload:{
                    dashboard:info.data.dashboard
                }})
            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.ADMIN_DASHBOARD_ERROR, payload: {
                    flashMessage:error.response.data.flashMessage
                } })
            }
            else {
                return dispatch({ type: Types.ADMIN_DASHBOARD_ERROR, payload:{
                    flashMessage:'Internal server error'
                } })
            }
        })
}




