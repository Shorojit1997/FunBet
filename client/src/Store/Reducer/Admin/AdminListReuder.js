import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    adminList:[]
}

const AdminListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_LIST:
            return {
                flashMessage:'',
                adminList:action.payload.adminList || []
            }
        case Types.ADMIN_LIST_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                adminList:state.adminList

            }
        default: return state

    }

}
export default AdminListReducer;