import React, { useEffect, useCallback } from 'react';

import MakeTable from '../Table/MakeTable';
import FinanceHeader from './FinanceHeader'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminWithdrawActionHandeler } from '../../Store/Actions/Admin/AdminWithdrawAction'


import { columnsInfo } from './WithdrawTableInfo/FinanceWithdrawInfo'
import { AcceptedColumnsInfo } from './WithdrawTableInfo/FinanceWithdrawAcceptInfo'
import { RejectedColumnsInfo } from './WithdrawTableInfo/FinanceWithdrawRejectInfo'
const FinanceWithdraw = () => {
    const { withdrawPending, withdrawAccepted, withdrawRejected } = useSelector(state => state.adminWithdraw, shallowEqual)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(adminWithdrawActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod()
    }, [callMethod])

    return (
        <div className='dashboard'>
            <FinanceHeader headerTitle='Withdraw pending List' />

            <div className='row my-auto center'>
                { <MakeTable columnsInfo={columnsInfo} columnData={withdrawPending} />}
            </div>
            <FinanceHeader headerTitle='Accepted withdraw list' />

            <div className='row my-auto center'>
                {<MakeTable columnsInfo={AcceptedColumnsInfo} columnData={withdrawAccepted} />}
            </div>
            <FinanceHeader headerTitle='Rejected withdraw list' />

            <div className='row my-auto center'>
                { <MakeTable columnsInfo={RejectedColumnsInfo} columnData={withdrawRejected} /> }
            </div>
        </div>
    );
};

export default FinanceWithdraw;