import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    userList:[]
}

const AdminUserListReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.USER_LIST:
            return {
                flashMessage:'',
                userList:action.payload.userList || []
            }
        case Types.USER_LIST_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',

            }
        default: return state

    }

}
export default AdminUserListReducer;