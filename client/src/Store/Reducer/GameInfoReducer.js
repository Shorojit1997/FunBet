
import * as Types from '../Types'

let initialState = {
    flashMessage:'',
    ludoRating: '',
    ludoX: '90',
    ludoY: '90',
    playStatus:'',
}


const GameInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LUDO_RATE_GET:
            return {
                ...state,
                flashMessage:'',
                ludoRating: action.payload.ludoRating || '0',
                ludoX: state.ludoX || '',
                ludoY: state.ludoY || '',
                playStatus:state.playStatus || ''
            }
        case Types.LUDO_PLAY:
            return {
                ...state,
                flashMessage:'',
                ludoRating: state.ludoRating || '0',
                ludoX: action.payload.ludoX || '',
                ludoY: action.payload.ludoY || '',
                playStatus:action.payload.playStatus || ''
            }
        case Types.LUDO_PLAY_ERROR:
            return {
                ...state,
                ludoRating: state.ludoRating,
                ludoX: state.ludoX,
                ludoY: state.ludoY,
                playStatus:state.playStatus || '',
                flashMessage:action.payload.flashMessage || ''
            }

        default:
            return state;
    }
}

export default GameInfoReducer;