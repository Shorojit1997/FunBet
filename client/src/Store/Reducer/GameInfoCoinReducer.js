
import * as Types from '../Types'

let initialState = {
    flashMessage: '',
    coinRating:'',
    playStatus: '',
    tossNumber: ''

}


const GameCoinInfoReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.COIN_RATE_GET:
            return {
                ...state,
                flashMessage: '',
                coinRating: action.payload.coinRating || '0',
                tossNumber: state.tossNumber,
                playStatus: state.playStatus || ''
            }
        case Types.COIN_PLAY:
            return {
                ...state,
                flashMessage: '',
                coinRating: state.coinRating || '0',
                playStatus: action.payload.playStatus,
                tossNumber: action.payload.tossNumber
            }
        case Types.COIN_PLAY_ERROR:
            return {
                ...state,
                coinRating: state.coinRating || '0',
                tossNumber: state.tossNumber,
                playStatus: state.playStatus || '',
                flashMessage: action.payload.flashMessage || ''
            }

        default:
            return state;
    }
}

export default GameCoinInfoReducer;