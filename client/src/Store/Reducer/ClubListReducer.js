import * as Types from '../Types'

const initialstate = {
    clubList: [],
    flashMessage: ''
}

const ClubListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.USER_GET_CLUB_LIST:
            return {
                clubList: action.payload.clubList || [],
                flashMessage: state.flashMessage
            }
        case Types.USER_GET_CLUB_LIST_ERROR:
            return {
                clubList: state.clubList,
                flashMessage: action.payload.flashMessage || ''
            }
        default: return state

    }

}
export default ClubListReducer;