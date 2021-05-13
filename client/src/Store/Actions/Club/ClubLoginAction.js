import { loginErrorChecker } from '../../../Validator/LoginValidator'
import * as Types from '../../Types'
import axios from 'axios'
import authHeaderToken from '../../../AuthHeader/AuthHeader'

export const loginActionHandeler = (user, history) => async (dispatch) => {
    const error = loginErrorChecker(user);

    if (Object.keys(error).length !== 0) {
        return dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: error })

    }
    ///here is fatch data from server 

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/api/club/login', user, config)
        .then(data => {
            if (data) {
                localStorage.setItem('clubAuthSecret', JSON.stringify({ ...data.data }))
                dispatch({
                    type: Types.CLUB_LOGIN_USER, payload:
                    {
                        user: data.data,
                        authInformations: data.data.authInformation
                    }
                })
                authHeaderToken(data.data.token)
                history.push('/club/dashboard')
            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: { error: error.response.data } })
            }
            else {
                return dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: { error: {} } })
            }
        })
}

function openWindow(data) {
    window.open('/club/dashboard', '_blank')
    return {
        type: Types.CLUB_LOGIN_USER,
        payload: {
            user: data,
            authInformations: data.authInformation
        }
    }
}


export const visitActionHandeler = (id) => async (dispatch) => {

    axios.get(`/api/admin/club/visit/${id}`)
        .then(data => {
            if (data) {
                localStorage.setItem('clubAuthSecret', JSON.stringify({ ...data.data }))
                return dispatch(openWindow(data.data))


            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: { error: error.response.data } })
            }
            else {
                return dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: { error: {} } })
            }
        })
}




