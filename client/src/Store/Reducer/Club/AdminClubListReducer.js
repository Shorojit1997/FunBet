import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    clublist: [],
}

const ClubListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_CLUB_LIST:
            return {
                flashMessage: state.flashMessage,
                clublist: action.payload.clublist || [],
            }
       
        case Types.ADMIN_CLUB_LIST_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                clublist: state.clublist,

            }
        default: return state

    }

}
export default ClubListReducer;