
import * as Types from '../../Types'
import axios from 'axios'

export const clubListActionHandeler = () => async (dispatch) => {

    axios.get('/api/club/club_member')
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.CLUB_MEMBER_LIST, payload:{
                    clubMember:info.data.clubMember
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.CLUB_MEMBER_LIST_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.CLUB_MEMBER_LIST_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}



export const clubMemberBetActionHandeler = (id) => async (dispatch) => {
    axios.get(`/api/club/club_member/${id}`)
        .then(info => {
         
            if (info.data) {
                dispatch({ type: Types.CLUB_MEMBER_BET_LIST, payload:{
                    betList:info.data.betlist
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.CLUB_MEMBER_LIST_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.CLUB_MEMBER_LIST_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}