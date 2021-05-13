
import * as Types from '../../Types'
import dateformat from 'dateformat'
import axios from 'axios'


export const adminPlaceBetsActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/admin/bets/placebets')
        .then(info => {
            let newData = info.data.placeBetsList.map((item,index) => {
                return ({
                    col1:index+1,
                    col2: item.username,
                    col3: item.matchName,
                    col4: item.questionName,
                    col5: item.answer,
                    col6: dateformat(item.requestedAt, "dd-mm-yy, h:MM TT"),
                    col7: item.amount,
                    col8: item.returnRate,
                    col9: item.possiblyWin,
                    col10: item.returnAmount,
                    col11: item.winStatus,
                    col12:{
                        _id:item._id,
                        // placeBetId:item._id,
                        matchId:item.matchId,
                        questionId:item.questionId,
                        optionId:item.optionId,
                        winStatus:item.winStatus
                    }
                })
            })
            dispatch({
                type: Types.ADMIN_PLACE_BETS, payload: {
                    placeBetsList: newData
                }
            })

        })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.ADMIN_PLACE_BETS_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.ADMIN_PLACE_BETS_ERROR, payload: {
                        flashMessage: 'Internal server error'
                    }
                })
            }
        })
}



