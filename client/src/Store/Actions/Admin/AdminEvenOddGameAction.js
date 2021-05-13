import * as Types from '../../Types'
import dateformat from 'dateformat'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const adminEvenOddGetActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/admin/games/even_odd')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.ADMIN_EVEN_GET, payload:{
                    evenInfo:info.data.evenOddInfo,
                    flashMessage:info.data.flashMessage
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_EVEN_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_EVEN_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}


export const adminEvenOddBetListActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/games/gamebets/even_odd')
        .then(info => {
            let ludoList=arrayFiltering(info.data.gameList);
            if (info.data) {
                dispatch({ type: Types.ADMIN_EVEN_LIST_GET, payload:{
                    flashMessage:info.data.flashMessage,
                    evenList:ludoList
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_EVEN_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_EVEN_ERROR, payload: {flashMessage:'Internal server error'} })
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