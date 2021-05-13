import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    cardInfo: [],
    cardList: [],
}

const AdminCardGameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_CARD_GET:
            return {
                flashMessage: action.payload.flashMessage,
                cardInfo: action.payload.cardInfo || [],
                cardList: state.cardList || [],
            }

        case Types.ADMIN_CARD_LIST_GET:
            return {
                flashMessage: action.payload.flashMessage,
                cardInfo:state.cardInfo || [],
                cardList: action.payload.cardList || [],
            }

        case Types.ADMIN_CARD_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                cardInfo:state.cardInfo || [],
                cardList: state.cardList || [],

            }
        default: return state

    }

}
export default AdminCardGameReducer;