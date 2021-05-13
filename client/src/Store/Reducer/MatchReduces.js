import * as Types from '../Types'

let initialState={
   bets:[]
}

const MatchReducer=(state=initialState,action)=>
{
    switch(action.type){
        case Types.BET_EN:
            return{
                ...state,
               bets:action.payload.bets || []
            }
      
        default :
        return state;
    }
}

export default MatchReducer;