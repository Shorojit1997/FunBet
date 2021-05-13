import * as Types from '../Types'

const initialstate = {
    flashMessage:'',
    transferData:[]
}

const TransferReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_TRANSFER_INFO:
            return {
                ...state,
                transferData:action.payload.transferData || []
            }
        case Types.GET_TRANSFER_INFO_ERROR:
            return {
                ...state,
                flashMessage:action.payload.flashMessage ||'',
                transferData:state.transferData
            }
        default: return state
            
    }

}
export default TransferReducer;