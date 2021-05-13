import * as Types from '../Types'

const initialstate = {
    flashMessage:'',
    depositData:[]
}

const DepositReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_DEPOSIT_INFO:
            return {
                ...state,
                depositData:action.payload.depositData || []
            }
        case Types.GET_DEPOSIT_INFO_ERROR:
            return {
                ...state,
                flashMessage:action.payload.flashMessage || '',
                depositData:state.depositData
            }
        default: return state
            
    }

}
export default DepositReducer;