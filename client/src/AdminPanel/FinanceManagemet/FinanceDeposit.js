import React, { useEffect, useCallback } from 'react';

import MakeTable from '../Table/MakeTable';
import FinanceHeader from './FinanceHeader'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminDepositActionHandeler } from '../../Store/Actions/Admin/AdminDepositAction'


import { columnsInfo } from './DepositTableInfo/FinanceDepositInfo'
import { AcceptedColumnsInfo } from './DepositTableInfo/FinanceDepositAcceptInfo'
import { RejectedColumnsInfo } from './DepositTableInfo/FinanceDepositRejectInfo'

const FinaceDeposit = () => {
    const { depositPending, depositAccepted, depositRejected } = useSelector(state => state.adminDeposit, shallowEqual)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(adminDepositActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <FinanceHeader headerTitle='Deposit pending List' />

            <div className='row my-auto center'>
                { <MakeTable columnsInfo={columnsInfo} columnData={depositPending} />}
            </div>
            <FinanceHeader headerTitle='Accepted deposit list' />

            <div className='row my-auto center'>
                {<MakeTable columnsInfo={AcceptedColumnsInfo} columnData={depositAccepted} />}
            </div>
            <FinanceHeader headerTitle='Rejected deposit list' />

            <div className='row my-auto center'>
                {<MakeTable columnsInfo={RejectedColumnsInfo} columnData={depositRejected} />}
            </div>
        </div>
    );
};

export default FinaceDeposit;