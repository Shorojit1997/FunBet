import * as Types from '../../Types'
import dateformat from 'dateformat'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const adminLudoGetActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/admin/games/ludo', info)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_LUDO_GET, payload:{
                    ludoInfo:info.data.ludoInfo
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}


export const adminLudoBetListActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/games/gamebets/ludo')
        .then(info => {
            let ludoList=arrayFiltering(info.data.gameList);
            if (info.data) {
                dispatch({ type: Types.ADMIN_LUDO_LIST_GET, payload:{
                    flashMessage:info.data.flashMessage,
                    ludoList:ludoList
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}

//wheel 

export const adminWheelGetActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/games/wheel')
        .then(info => {

            if (info.data) {
                // console.log(info.data)
                dispatch({ type: Types.ADMIN_WHEEL_GET, payload:{
                    wheelInfo:info.data.wheelInfo
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}


export const adminWheelBetListActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/games/gamebets/wheel')
        .then(info => {
            let wheelList=arrayFiltering(info.data.gameList);
            if (info.data) {
                dispatch({ type: Types.ADMIN_WHEEL_LIST_GET, payload:{
                    flashMessage:info.data.flashMessage,
                    wheelList:wheelList
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_LUDO_GET_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}




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