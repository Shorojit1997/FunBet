import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    withdrawPending: [],
    withdrawAccepted:[],
    withdrawRejected:[],
}

const AdminWithdrawReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_GET_WITHDRAW_INFO:
            return {
                ...state,
                flashMessage:'',
                withdrawPending: action.payload.withdrawPending || [],
                withdrawAccepted: action.payload.withdrawAccepted || [],
                withdrawRejected: action.payload.withdrawRejected || [],
            }
        case Types.ADMIN_GET_WITHDRAW_INFO_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                withdrawPending:state.withdrawPending,
                withdrawAccepted:state.withdrawAccepted,
                withdrawRejected:state.withdrawRejected
            }
        default: return state

    }

}
export default AdminWithdrawReducer;