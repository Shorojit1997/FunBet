import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    stackName:[]
}

const AdminStacknameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_STACKNAME:
            return {
                flashMessage:'',
                stackName: action.payload.stackName || [],
            }
        case Types.ADMIN_STACKNAME_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                stackName:state.stackName || []
            }
        default: return state

    }

}
export default AdminStacknameReducer;