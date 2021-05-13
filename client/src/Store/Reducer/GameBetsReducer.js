import * as Types from '../Types'

const initialstate = {
    flashMessage: '',
    gameBets: [],
}

const GameBetsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GAME_BETS:
            return {
                flashMessage: '',
                gameBets: action.payload.gameBets || [],
            }

        case Types.GAME_BETS_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                gameBets: state.gameBets,

            }
        default: return state

    }

}
export default GameBetsReducer;