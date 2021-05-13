import React from 'react';
import { useDispatch } from 'react-redux'
import { adminBetsActionHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import axios from 'axios'
import * as Types from '../../../Store/Types'

const Fisnished = ({cell}) => {

    const dispatch = useDispatch();
    const { _id } = cell.value;

    const finishedStatusHandeler = () => {
        const apiUrl = `/api/admin/bets/finished/${_id}`
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
        <button onClick={finishedStatusHandeler} className='btn btn-sm btn-outline-danger'>Finished</button>
    );
};

export default Fisnished;