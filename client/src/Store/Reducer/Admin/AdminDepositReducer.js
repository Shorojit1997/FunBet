import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    depositPending: [],
    depositAccepted: [],
    depositRejected: [],
}

const AdminDepositReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_GET_DEPOSIT_INFO:
            return {
                ...state,
                flashMessage:'',
                depositPending: action.payload.depositPending || [],
                depositAccepted: action.payload.depositAccepted || [],
                depositRejected: action.payload.depositRejected || [],
            }
        case Types.ADMIN_GET_DEPOSIT_INFO_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                depositPending:state.depositPending,
                depositAccepted:state.depositAccepted,
                depositRejected:state.depositRejected,
            }
        default: return state

    }

}
export default AdminDepositReducer;