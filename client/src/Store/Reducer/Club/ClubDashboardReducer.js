import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    dashboard: {}
}

const ClubDashboardReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.CLUB_DASHBOARD:
            return {
                flashMessage: '',
                dashboard: action.payload.dashboard  || []
            }
        case Types.CLUB_DASHBOARD_ERROR:
            return {
                flashMessage: action.payload.flashMessage || '',
                dashboard: state.dashboard
            }
        default: return state
    }
}
export default ClubDashboardReducer;