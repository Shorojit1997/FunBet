import * as Types from '../Types'

const initialstate = {
    flashMessage:'',
    placeBetsData:[]
}

const PlaceBetsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.GET_PLACE_BETS_INFO:
            return {
                ...state,
                placeBetsData:action.payload.placeBetsData || []
            }
        case Types.GET_PLACE_BETS_INFO_ERROR:
            return {
                ...state,
                flashMessage:action.payload.flashMessage || '',
                placeBetsData:state.placeBetsData
            }
        default: return state
            
    }

}
export default PlaceBetsReducer;