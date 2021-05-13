import * as Types from '../Types'
import dateformat from 'dateformat'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")

export const GameBetListActionHandeler = () => async (dispatch) => {

    axios.get('/api/user/games/gamebets')
        .then(info => {
            let ludoList=arrayFiltering(info.data.gameBets);
            if (info.data) {
                dispatch({ type: Types.GAME_BETS, payload:{
                    flashMessage:info.data.flashMessage,
                    gameBets:ludoList
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.GAME_BETS_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.GAME_BETS_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}




const arrayFiltering=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.username || '',
            col3:item.gameName,
            col4:item.Stake,
            col5:dateformat(item.requestedAt, "dd-mm-yy"),
            col6:dateformat(item.requestedAt, "h:MM TT"),
            col7:item.R_stake,
            col8:item.amount,
            col9:item.returnRate,
            col10:item.possiblyWin,
            col11:item.winStatus,
        }
    })
}