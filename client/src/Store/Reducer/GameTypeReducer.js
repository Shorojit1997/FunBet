
import * as Types from '../Types'

let initialState = {
    gameType:[],

}


const GameTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_GAME_TYPE:
            return {
                ...state,
                gameType: action.payload.gameType || []
            }

        default:
            return state;
    }
}

export default GameTypeReducer;