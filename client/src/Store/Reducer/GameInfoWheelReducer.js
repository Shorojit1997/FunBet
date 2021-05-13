
import * as Types from '../Types'

let initialState = {
    flashMessage: '',
    wheelRating:'',
    wheelStatus: '',
    fortuneDegree: '22'

}


const GameWheelInfoReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case Types.WHEEL_RATE_GET:
            return {
                ...state,
                flashMessage: '',
                wheelRating: action.payload.wheelRating || '0',
                fortuneDegree: state.fortuneDegree,
                wheelStatus: state.wheelStatus || ''
            }
        case Types.WHEEL_PLAY:
            return {
                ...state,
                flashMessage: '',
                wheelRating: state.wheelRating || '0',
                fortuneDegree: action.payload.fortuneDegree,
                wheelStatus: action.payload.wheelStatus
            }
        case Types.WHEEL_PLAY_ERROR:
            return {
                ...state,
                wheelRating: state.wheelRating || '0',
                fortuneDegree: state.fortuneDegree,
                wheelStatus: state.wheelStatus || '',
                flashMessage: action.payload.flashMessage || ''
            }

        default:
            return state;
    }
}

export default GameWheelInfoReducer;