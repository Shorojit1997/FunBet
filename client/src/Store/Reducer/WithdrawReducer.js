import * as Types from '../Types'

const initialstate = {
    flashMessage:'',
    withdrawData:[]
}

const WithdrawReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_WITHDRAW_INFO:
            return {
                ...state,
                withdrawData:action.payload.withdrawData || []
            }
        case Types.GET_TRANSFER_INFO_ERROR:
            return {
                ...state,
                flashMessage:action.payload.flashMessage || '',
                withdrawData:state.withdrawData
            }
        default: return state
            
    }

}
export default WithdrawReducer;