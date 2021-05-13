import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    sendlist: [],
    receivelist:[]
}

const AdminClubMessageReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_CLUB_SEND_MESSAGE:
            return {
                flashMessage: state.flashMessage,
                sendlist: action.payload.sendlist || [],
                receivelist: state.receivelist,
            }
        case Types.ADMIN_CLUB_RECEIVE_MESSAGE:
            return {
                flashMessage: state.flashMessage,
                sendlist: state.sendlist,
                receivelist: action.payload.receivelist || [],
            }

        case Types.ADMIN_CLUB_MESSAGE_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                sendlist: state.sendlist,
                require: state.receivelist,

            }
        default: return state

    }

}
export default AdminClubMessageReducer;