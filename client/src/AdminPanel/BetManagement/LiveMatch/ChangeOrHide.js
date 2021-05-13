import React from 'react';
import { useDispatch } from 'react-redux'
import { adminBetsActionHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import axios from 'axios'
import * as Types from '../../../Store/Types'


const ChangeOrHide = ({ cell }) => {
    const dispatch = useDispatch();
    const { _id, playStatus } = cell.value;

    const changeStatusHandeler = () => {
        const apiUrl = `/api/admin/bets/change_status/${_id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminBetsActionHandeler())
            })
            .catch(e => {
                if (e.response.data) {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: e.response.data.flashMessage } })
                }
                else {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: 'Internal server error' } })
                }
            })
    }

    const hiddenStatusHandeler = () => {
        const apiUrl = `/api/admin/bets/hidden/${_id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminBetsActionHandeler())
            })
            .catch(e => {
                if (e.response.data) {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: e.response.data.flashMessage } })
                }
                else {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: 'Internal server error' } })
                }
            })
    }


    return (
        <div className='d-flex justify-content-center'>
            <button
                onClick={hiddenStatusHandeler}
                className={playStatus === 'Hidden' ? 'btn btn-sm btn-danger m-1' : 'btn btn-sm btn-warning m-1'}>{playStatus === 'Hidden' ? 'Live' : 'Hidden'}
            </button>
            <button onClick={changeStatusHandeler} className='btn btn-sm btn-success m-1'>Change</button>
        </div>
    );
};

export default ChangeOrHide;