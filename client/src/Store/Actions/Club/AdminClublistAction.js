
import * as Types from '../../Types'
import axios from 'axios'

export const clubListActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/club/clublist')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.ADMIN_CLUB_LIST, payload:{
                    clublist:info.data.clublist
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_CLUB_LIST_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_CLUB_LIST_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}
