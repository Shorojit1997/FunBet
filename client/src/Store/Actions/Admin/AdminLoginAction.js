import { loginErrorChecker } from '../../../Validator/LoginValidator'
import * as Types from '../../Types'
import axios from 'axios'
import authHeaderToken from '../../../AuthHeader/AuthHeader'

export const adminoginActionHandeler = (admin, history) => async (dispatch) => {
    const error = loginErrorChecker(admin);

    if (Object.keys(error).length !== 0) {
        return dispatch({ type: Types.LOGIN_ADMIN_ERROR, payload: error })

    }
    ///here is fatch data from server 

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/api/admin/login', admin, config)
        .then(data => {
            if (data) {
                localStorage.setItem('adminAuthSecret', JSON.stringify({ ...data.data }))
                dispatch({ type: Types.LOGIN_ADMIN, payload: data.data })
                authHeaderToken(data.data.token)
                history.push('/admin/dashboard')
            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.LOGIN_ADMIN_ERROR, payload: error.response.data })
            }
            else {
                return dispatch({ type: Types.LOGIN_ADMIN_ERROR, payload:'404 not found' })
            }
        })
}




