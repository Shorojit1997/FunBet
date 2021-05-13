import * as Types from '../Types'
import { registerErrorChecker } from '../../Validator/RegisterValidator';
import{loginActionHandeler} from './LoginAction'
import axios from 'axios'


export const registerActionHandeler = (user,history) => async (dispatch) => {
    const error = registerErrorChecker(user)

    if (Object.keys(error).length !== 0) {
        return dispatch({ type: Types.REGISTER_ERROR, payload: error })
    }

    axios.post('/api/user/signup', user)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.REGISTER_USER, payload: info.data })
            }
            let loginInfo={
                email:user.email,
                password: user.password,
                promocode:user.promocode
            }
            dispatch(loginActionHandeler(loginInfo,history))

        })
        .catch(error => {
            if (error.response) {
                dispatch({ type: Types.REGISTER_ERROR, payload: error.response.data })
            }
            else{
                dispatch({ type: Types.REGISTER_ERROR, payload: {} })
            }
        })

}
