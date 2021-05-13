import React, { useEffect, useCallback } from 'react';

import MakeTable from '../../AdminPanel/Table/MakeTable';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { ClubwithdrawActionHandeler } from '../../Store/Actions/Club/WithdrawAction'
import { columnsInfo } from './TableInfo'

const Member = () => {
    const {withdrawData } = useSelector(state => state.clubWithdraw, shallowEqual)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(ClubwithdrawActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <div className='row my-auto '><div className='col-6 text-left '><h5>View Transactions</h5> </div> </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={withdrawData} />}
            </div>


        </div>
    );
};

export default Member;