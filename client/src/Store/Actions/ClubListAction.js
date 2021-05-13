
import * as Types from '../Types'
import axios from 'axios'

export const clubListActionHandeler = (history) => async (dispatch) => {
    axios.get('/api/user/clublist')
    .then(info=>{
        dispatch({type:Types.USER_GET_CLUB_LIST,payload:{clubList:info.data.clubList}})
    })
        .catch(error => {
            if (error.response) {
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.flashMessage
                    }
                })
            }
            else{
                return dispatch({
                    type: Types.GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: 'Internal server error.'
                    }
                })
            }
        })
}



