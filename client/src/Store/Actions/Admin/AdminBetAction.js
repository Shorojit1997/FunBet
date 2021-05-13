
import * as Types from '../../Types'
import axios from 'axios'
export const adminBetsActionHandeler = () => async (dispatch) => {
    return axios.get(`/api/admin/bets`)
        .then(info => {
            let betsList = arrayFiltering(info.data.betsList);
            dispatch({
                type: Types.ADMIN_BET,
                payload: {
                    betsList: betsList,
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}
//finished get handeler

export const adminBetsFinishedActionHandeler = () => async (dispatch) => {
    return axios.get(`/api/admin/bets/finished`)
        .then(info => {
            let finishedList = finishedArrayFiltering(info.data.finishedList);
            dispatch({
                type: Types.ADMIN_FINISHED_BET,
                payload: {
                    finishedList: finishedList,
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else {
                return dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



export const adminBetSingleElementHandeler=(matchId)=>async(dispatch)=>{

    return axios.get(`/api/admin/bets/single_element/${matchId}`)
    .then(info => {
        const singleElement=info.data.singleElement
        dispatch({
            type: Types.ADMIN_BET_SINGLE_LIST,
            payload: {
                singleElement: singleElement,
            }
        })

    })
    .catch(error => {
        if (error.response) {
            return dispatch({
                type: Types.ADMIN_BET_ERROR, payload: {
                    flashMessage: error.response.data.flashMessage
                }
            })
        }
        else {
            return dispatch({
                type: Types.ADMIN_BET_ERROR, payload: {
                    flashMessage: 'Internal server error'
                }
            })
        }
    })
}








const arrayFiltering = (items) => {
    let newItem = items.map((item, index) => {
        let newd=item.gameDate.slice(0,10);
        return {
            col1: index + 1,
            col2: item.gameType,
            col3: item.teamA,
            col4: item.teamB,
            col5: item.turnamentName,
            col6:newd,// item.gameDate,
            col7: item.gameTime,
            col8: item.score,
            col9: item._id,
            col10: item.playStatus,
            col11: { _id: item._id, playStatus: item.playStatus },
            col12: { _id: item._id, playStatus: item.playStatus },
            col13: {
                gameType: item.gameType,
                teamA: item.teamA,
                teamB: item.teamB,
                turnamentName: item.turnamentName,
                _id: item._id,
                gameDate: item.gameDate,
                gameTime: item.gameTime,
                playStatus: item.playStatus,
                questions: item.questions
            },
        }
    })

    return newItem;
}


const finishedArrayFiltering = (items) => {
    let newItem = items.map((item, index) => {
        let newd=item.gameDate.slice(0,10);
        return {
            col1: index + 1,
            col2: item.gameType,
            col3: item.teamA,
            col4: item.teamB,
            col5: item.turnamentName,
            col6:newd,// item.gameDate,
            col7: item.gameTime,
            col8: item.score,
            col9: item._id,
            col10:item.playStatus,
            col11:item.totalBetsAmount ,
            col12:item.totalReturnAmount,
            col13:JSON.stringify(parseFloat(item.totalBetsAmount,10)-parseFloat(item.totalReturnAmount,10)),
        }
    })

    return newItem;
}