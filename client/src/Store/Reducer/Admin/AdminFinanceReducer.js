import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    finance:{}
}

const AdminFinanceReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_FINANCE:
            return {
                flashMessage:action.payload.flashMessage || '',
                finance:action.payload.finance || {}
           
            }
        case Types.ADMIN_FINANCE_ERROR:
            return {
                flashMessage:action.payload.flashMessage || '',
                finance:state.finance
               
            }
        default: return state

    }

}
export default AdminFinanceReducer;