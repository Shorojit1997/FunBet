
import * as Types from '../Types'

let initialState = {
    gameType: 'All',

}


const QuestionReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GAME_TYPE:
            return {
                ...state,
                gameType: action.payload.gameType || ''
            }

        default:
            return state;
    }
}

export default QuestionReducer;