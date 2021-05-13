import React from 'react';
import axios from 'axios'
import { adminPlaceBetsActionHandeler } from '../../Store/Actions/Admin/AdminPlaceBetsAction'
import { useDispatch } from 'react-redux'
import * as Types from '../../Store/Types'

const BetStatisticsHandeler = ({ cell }) => {
    const { _id, questionId, optionId, matchId, winStatus } = cell.value;
    const dispatch = useDispatch()
    const cancellHandler = () => {
        const ob = {
            questionId: questionId,
            optionId: optionId,
            placeBetId: _id
        }
        const postUrl = `/api/admin/bets/cancel_placebets/${matchId}`
        axios.post(postUrl, ob)
            .then(info => {
                dispatch(adminPlaceBetsActionHandeler());
            })
            .catch(e => {
                dispatch({ type: Types.ADMIN_PLACE_BETS_ERROR, payload: { flashMessage: 'Internal server error.' } })
            })
    }


    return (
        <>
            {
                winStatus !== 'Cancel' ?
                    <button onClick={cancellHandler} className='btn btn-warning btn-sm m-1' >Cancel</button> :
                    <button onClick={cancellHandler} disabled className='btn btn-danger btn-sm m-1' >Cancelled</button>
            }
        </>
    );
};

export default BetStatisticsHandeler;