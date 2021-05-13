
import * as Types from '../Types'

let initialState = {
    flashMessage: '',
    cardRating: '',
    playStatus: '',
    computer: [],
    yourCard: []
}
// (<div key={parseInt(Math.random()*99999)}></div>)

const GameCardInfoReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.CARD_RATE_GET:
            return {
                ...state,
                flashMessage: '',
                cardRating: action.payload.cardRating || '0',
                playStatus: state.playStatus || '',
                computer: state.computer,
                yourCard: state.yourCard,
            }
        case Types.CARD_PLAY:
            return {
                ...state,
                flashMessage: '',
                cardRating: state.cardRating || '0',
                playStatus: action.payload.playStatus,
                computer: state.computer,
                yourCard: state.yourCard,
            }
        case Types.CARD_ADD:
            return {
                ...state,
                flashMessage: '',
                cardRating: state.cardRating || '0',
                playStatus: state.playStatus,
                computer: [...state.computer, action.payload.computer],
                yourCard: [...state.yourCard, action.payload.yourCard],
            }
        case Types.CARD_CLEAN:
            return {
                ...state,
                flashMessage: '',
                cardRating: state.cardRating || '0',
                playStatus: state.playStatus,
                computer: [],
                yourCard: [],
            }
        case Types.CARD_PLAY_ERROR:
            return {
                ...state,
                cardRating: state.cardRating || '0',
                playStatus: state.playStatus || '',
                flashMessage: action.payload.flashMessage || '',
                computer: state.computer,
                yourCard: state.yourCard,
            }

        default:
            return state;
    }
}

export default GameCardInfoReducer;