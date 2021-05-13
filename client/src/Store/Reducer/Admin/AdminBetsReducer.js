import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    betsList: [],
    singleElement: {},
    finishedList:[]

}

const AdminBetsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_BET:
            return {
                flashMessage: '',
                betsList: action.payload.betsList || [],
                singleElement: state.singleElement,
                finishedList:state.finishedList
            }
        case Types.ADMIN_BET_ERROR:
            return {
                flashMessage: action.payload.flashMessage || '',
                betsList: state.betsList,
                singleElement: state.singleElement,
                finishedList:state.finishedList
            }
        case Types.ADMIN_BET_SINGLE_LIST:
            return {
                flashMessage: '',
                betsList: state.betsList,
                singleElement: action.payload.singleElement || [],
                finishedList:state.finishedList
            }
        case Types.ADMIN_FINISHED_BET:
            return {
                flashMessage: '',
                betsList: state.betsList,
                singleElement: state.singleElement,
                finishedList:action.payload.finishedList ||[]
            }

        default: return state

    }

}
export default AdminBetsReducer;