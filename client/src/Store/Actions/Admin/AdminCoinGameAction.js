import * as Types from '../../Types'
import dateformat from 'dateformat'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const adminCoinGetActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/admin/games/coin', info)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_COIN_GET, payload:{
                    coinInfo:info.data.coinInfo,
                    flashMessage:info.data.flashMessage
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_COIN_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_COIN_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}


export const adminCoinBetListActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/games/gamebets/coin_toss')
        .then(info => {
            let ludoList=arrayFiltering(info.data.gameList);
            if (info.data) {
                dispatch({ type: Types.ADMIN_COIN_LIST_GET, payload:{
                    flashMessage:info.data.flashMessage,
                    coinList:ludoList
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_COIN_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_COIN_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}

//wheel 


const arrayFiltering=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.username || '',
            col3:item.Stake,
            col4:dateformat(item.requestedAt, "dd-mm-yy"),
            col5:dateformat(item.requestedAt, "h:MM TT"),
            col6:item.R_stake,
            col7:item.amount,
            col8:item.returnRate,
            col9:item.possiblyWin,
            col10:item.winStatus,
        }
    })
}