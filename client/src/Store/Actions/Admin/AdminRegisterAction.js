import * as Types from '../../Types'
import { registerErrorChecker } from '../../../Validator/AdminRegisterValidator'
import axios from 'axios'


export const adminRegisterActionHandeler = (admin) => async (dispatch) => {
    const error = registerErrorChecker(admin)

    if (Object.keys(error).length !== 0) {
        return dispatch({ type: Types.REGISTER_ADMIN_ERROR, payload: error })
    }

    axios.post('/api/admin/signup', admin)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.REGISTER_ADMIN, payload: info.data })
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.REGISTER_ADMIN_ERROR, payload: error.response.data })
            else{
                dispatch({ type: Types.REGISTER_ADMIN_ERROR, payload: {} })
            }
        })

}
