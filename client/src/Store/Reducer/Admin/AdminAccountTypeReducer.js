import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    TypeInfo:[]
}

const AdminAccountTypeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_ACCOUNT_TYPE:
            return {
                flashMessage:'',
                TypeInfo: action.payload.TypeInfo || [],
            }
        case Types.ADMIN_ACCOUNT_TYPE_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                TypeInfo: state.TypeInfo 
            }
        default: return state

    }

}
export default AdminAccountTypeReducer;