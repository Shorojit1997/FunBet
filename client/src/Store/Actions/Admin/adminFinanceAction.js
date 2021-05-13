import * as Types from '../../Types'

import axios from 'axios'


export const adminFinanceGetActionHandeler = (setAccountDetails) => async (dispatch) => {

    axios.get('/api/admin/finance')
        .then(info => {
            if (info.data) {
                setAccountDetails(prev=>info.data.finance)
                dispatch({
                    type: Types.ADMIN_FINANCE, payload: {
                        finance: info.data.finance
                    }
                })
            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.ADMIN_FINANCE_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.ADMIN_FINANCE_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })
}
export const adminFinancePostActionHandeler = ({accountDetails,setAccountDetails}) => async (dispatch) => {

    axios.post('/api/admin/finance', accountDetails)
        .then(info => {
            if (info.data) {
                setAccountDetails(prev=>info.data.finance)
                dispatch({
                    type: Types.ADMIN_FINANCE, payload: {
                        finance: info.data.finance,
                        flashMessage:'Successfully updated'
                    }
                })
                setTimeout(()=>{
                    dispatch({ type: Types.ADMIN_FINANCE_ERROR, payload: { flashMessage: '' } })
                },2000)
            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.ADMIN_FINANCE_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.ADMIN_FINANCE_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })
}