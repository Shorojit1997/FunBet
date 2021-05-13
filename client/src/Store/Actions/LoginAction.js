import { loginErrorChecker } from '../../Validator/LoginValidator'
import * as Types from '../Types'
import axios from 'axios'
import authHeaderToken from '../../AuthHeader/AuthHeader'

export const loginActionHandeler = (user, history) => async (dispatch) => {
    const error = loginErrorChecker(user);

    if (Object.keys(error).length !== 0) {
        return dispatch({ type: Types.LOGIN_ERROR, payload: error })

    }
    ///here is fatch data from server 

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/api/user/login', user, config)
        .then(data => {
            if (data) {
                localStorage.setItem('authSecret', JSON.stringify({ ...data.data }))
                dispatch({
                    type: Types.LOGIN_USER, payload:
                    {
                        user: data.data,
                        authInformations: data.data.authInformation
                    }
                })
                authHeaderToken(data.data.token)
                history.push('/')
            }
        })
        .catch(error => {
            if (error.response) {
                return dispatch({ type: Types.LOGIN_ERROR, payload: { error: error.response.data } })
            }
            else {
                return dispatch({ type: Types.LOGIN_ERROR, payload: { error: {} } })
            }
        })
}


function openWindow(data) {
    window.open('/','_blank');
    return {
        type: Types.LOGIN_USER,
        payload: {
            user: data,
            authInformations: data.authInformation
        }
    }
}

export const adminVisitActionHandeler = (_id,setModal) => async (dispatch) => {

    axios.get(`/api/admin/user/visit/${_id}`)
        .then(data => {
            if (data) {
                setModal(false);
                localStorage.setItem('authSecret', JSON.stringify({ ...data.data }))
                return dispatch(openWindow(data.data))
            }
        })
        .catch(error => {
            if (error.response) {
               
                return dispatch({ type: Types.LOGIN_ERROR, payload: { error: error.response.data } })
            }
            else {
                return dispatch({ type: Types.LOGIN_ERROR, payload: { error: {} } })
            }
        })
}