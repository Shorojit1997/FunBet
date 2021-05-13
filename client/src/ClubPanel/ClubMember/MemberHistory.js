import React, { useEffect, useCallback } from 'react';

import MakeTable from '../../AdminPanel/Table/MakeTable';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { clubMemberBetActionHandeler } from '../../Store/Actions/Club/ClubMemberAction'
import { columnsInfo } from './BetHistoyTableInfo'
import{useParams} from 'react-router-dom'

const Member = () => {
    const {betList } = useSelector(state => state.clubMember, shallowEqual)
    const dispatch = useDispatch();
    const {slug}=useParams();

    const callMethod = useCallback(() => {
        dispatch(clubMemberBetActionHandeler(slug))
    }, [dispatch,slug])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <div className='row my-auto '><div className='col-6 text-left '><h5>View Transactions</h5> </div> </div>
            <div className='row my-auto center'>
                { <MakeTable columnsInfo={columnsInfo} columnData={betList} />}
            </div>


        </div>
    );
};

export default Member;