import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    dashboard: {}
}

const AdminDashboardReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_DASHBOARD:
            return {
                flashMessage: '',
                dashboard: action.payload.dashboard  || []
            }
        case Types.ADMIN_DASHBOARD_ERROR:
            return {
                flashMessage: action.payload.flashMessage || '',
                dashboard: state.dashboard
            }
        default: return state
    }
}
export default AdminDashboardReducer;