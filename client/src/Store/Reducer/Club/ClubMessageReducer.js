import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    sendlist: [],
    receivelist:[]
}

const ClubMessageReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.CLUB_SEND_MESSAGE:
            return {
                flashMessage: state.flashMessage,
                sendlist: action.payload.messagelist || [],
                receivelist: state.receivelist,
            }
        case Types.CLUB_RECEIVE_MESSAGE:
            return {
                flashMessage: state.flashMessage,
                sendlist: state.sendlist,
                receivelist: action.payload.messagelist || [],
            }

        case Types.CLUB_MESSAGE_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                sendlist: state.sendlist,
                require: state.receivelist,

            }
        default: return state

    }

}
export default ClubMessageReducer;