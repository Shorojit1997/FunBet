import * as Types from '../../Types'

const initialstate = {
    flashMessage:'',
    placeBetsList:[]
}

const AdminPlaceBetsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_PLACE_BETS:
            return {
                flashMessage:'',
                placeBetsList:action.payload.placeBetsList || []
            }
        case Types.ADMIN_PLACE_BETS_ERROR:
            return {
                flashMessage:action.payload.flashMessage || '',
                placeBetsList:state.placeBetsList
            }
        default: return state
            
    }

}
export default AdminPlaceBetsReducer;