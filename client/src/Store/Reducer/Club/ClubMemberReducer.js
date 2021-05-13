import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    clubMember: [],
    betList: [],
}

const ClubMemberReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.CLUB_MEMBER_LIST:
            return {
                flashMessage: state.flashMessage,
                clubMember: action.payload.clubMember || [],
                betList: state.betList,
            }
        case Types.CLUB_MEMBER_BET_LIST:
            return {
                flashMessage: state.flashMessage,
                clubMember: state.clubMember,
                betList: action.payload.betList || [],
            }

        case Types.CLUB_MEMBER_LIST_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                clubMember: state.clubMember,
                betList: state.betList,

            }
        default: return state

    }

}
export default ClubMemberReducer;