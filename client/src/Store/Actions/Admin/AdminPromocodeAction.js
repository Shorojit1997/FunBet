import * as Types from '../../Types'

import axios from 'axios'


export const adminPromocodeActionHandeler = () => async (dispatch) => {
  
    axios.get('/api/admin/security')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.ADMIN_GET_PROMOCODE, payload:{
                    promocode:info.data.promocode
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_PROMOCODE_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_PROMOCODE_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}
// color settings

