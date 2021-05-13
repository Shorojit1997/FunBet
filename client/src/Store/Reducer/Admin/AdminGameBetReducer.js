import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    flashMessage1:'',
    ludoInfo: [],
    ludoList: [],
    wheelInfo: [],
    wheelList: []
}

const AdminGameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_LUDO_GET:
            return {
                flashMessage: action.payload.flashMessage,
                ludoInfo: action.payload.ludoInfo || [],
                wheelInfo: state.wheelInfo || [],
                ludoList: state.ludoList || [],
                wheelList: state.wheelList || []
            }

        case Types.ADMIN_WHEEL_GET:
            return {
                flashMessage1: action.payload.flashMessage,
                wheelInfo: action.payload.wheelInfo || [],
                ludoInfo: state.ludoInfo || [],
                ludoList: state.ludoList || [],
                wheelList: state.wheelList || []
            }
        case Types.ADMIN_LUDO_LIST_GET:
            return {
                flashMessage: action.payload.flashMessage,
                ludoInfo: state.ludoInfo || [],
                wheelInfo: state.wheelInfo || [],
                ludoList: action.payload.ludoList || [],
                wheelList: state.wheelList || []
            }

        case Types.ADMIN_WHEEL_LIST_GET:
            return {
                flashMessage: action.payload.flashMessage,
                ludoInfo: state.ludoInfo || [],
                wheelInfo: state.wheelInfo || [],
                ludoList: state.ludoList || [],
                wheelList: action.payload.wheelList || []
            }

        case Types.ADMIN_LUDO_GET_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                ludoInfo: state.ludoInfo || [],
                wheelInfo: state.wheelInfo || [],
                ludoList: state.ludoList || [],
                wheelList: state.wheelList || []

            }
        default: return state

    }

}
export default AdminGameReducer;