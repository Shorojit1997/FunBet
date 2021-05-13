
import * as Types from '../Types'

let initialState = {
    flashMessage: '',
    evenOddRating:'',
    playStatus: '',
    tossNumber: ''

}


const GameEvenInfoReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.EVEN_RATE_GET:
            return {
                ...state,
                flashMessage: '',
                evenOddRating: action.payload.evenOddRating || '0',
                tossNumber: state.tossNumber,
                playStatus: state.playStatus || ''
            }
        case Types.EVEN_PLAY:
            return {
                ...state,
                flashMessage: '',
                evenOddRating: state.evenOddRating || '0',
                playStatus: action.payload.playStatus,
                tossNumber: action.payload.tossNumber
            }
        case Types.EVEN_PLAY_ERROR:
            return {
                ...state,
                evenOddRating: state.evenOddRating || '0',
                tossNumber: state.tossNumber,
                playStatus: state.playStatus || '',
                flashMessage: action.payload.flashMessage || ''
            }

        default:
            return state;
    }
}

export default GameEvenInfoReducer;