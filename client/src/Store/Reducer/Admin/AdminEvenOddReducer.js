import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    evenInfo: [],
    evenList: [],
}

const AdminEvenOddGameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_EVEN_GET:
            return {
                flashMessage: action.payload.flashMessage,
                evenInfo: action.payload.evenInfo || [],
                evenList: state.evenList || [],
            }

        case Types.ADMIN_EVEN_LIST_GET:
            return {
                flashMessage: action.payload.flashMessage,
                evenInfo:state.evenInfo || [],
                evenList: action.payload.evenList || [],
            }

        case Types.ADMIN_EVEN_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                evenInfo:state.evenInfo || [],
                evenList: state.evenList || [],

            }
        default: return state

    }

}
export default AdminEvenOddGameReducer;