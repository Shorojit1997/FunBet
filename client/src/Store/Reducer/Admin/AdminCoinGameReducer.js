import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    coinInfo: [],
    coinList: [],
}

const AdminCoinGameReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_COIN_GET:
            return {
                flashMessage: action.payload.flashMessage,
                coinInfo: action.payload.coinInfo || [],
                coinList: state.coinList || [],
            }

        case Types.ADMIN_COIN_LIST_GET:
            return {
                flashMessage: action.payload.flashMessage,
                coinInfo:state.coinInfo || [],
                coinList: action.payload.coinList || [],
            }

        case Types.ADMIN_COIN_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage,
                coinInfo:state.coinInfo || [],
                coinList: state.coinList || [],

            }
        default: return state

    }

}
export default AdminCoinGameReducer;