import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    stack:[]
}

const AdminStackReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_STACK:
            return {
                flashMessage:'',
                stack: action.payload.stack || [],
            }
        case Types.ADMIN_STACK_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                stack:state.stack
            }
        default: return state

    }

}
export default AdminStackReducer;