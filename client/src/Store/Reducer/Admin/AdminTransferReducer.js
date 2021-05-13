import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    transferPending: [],
    transferAccepted: [],
    transferRejected: [],
}

const AdminTransferReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_GET_TRANSFER_INFO:
            return {
                ...state,
                flashMessage:'',
                transferPending: action.payload.transferPending || [],
                transferAccepted: action.payload.transferAccepted || [],
                transferRejected: action.payload.transferRejected || [],
            }
        case Types.ADMIN_GET_TRANSFER_INFO_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                transferPending:state.transferPending,
                transferAccepted:state.transferAccepted,
                transferRejected:state.transferRejected,
            }
        default: return state

    }

}
export default AdminTransferReducer;