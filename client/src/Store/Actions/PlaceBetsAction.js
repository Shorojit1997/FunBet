
import * as Types from '../Types'
import dateformat from 'dateformat'
import axios from 'axios'


export const placeBetsActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/user/place_bets')
        .then(info => {
            let newData = info.data.placeBetsData.map(item => {
                return ({
                    col1: item.username,
                    col2: item.matchName,
                    col3: item.questionName,
                    col4: item.answer,
                    col5: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col6: item.amount,
                    col7: item.returnRate,
                    col8: item.possiblyWin,
                    col9: item.returnAmount,
                    col10: item.winStatus,
                })
            })
            dispatch({
                type: Types.GET_PLACE_BETS_INFO, payload: {
                    placeBetsData: newData
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_PLACE_BETS_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.GET_PLACE_BETS_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



