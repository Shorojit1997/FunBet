import React, { useEffect, useCallback } from 'react';

import MakeTable from '../Table/MakeTable';
import FinanceHeader from './FinanceHeader'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminTransferActionHandeler } from '../../Store/Actions/Admin/AdminTransferAction'

import { columnsInfo } from './TransferTableInfo/FinanceTransferInfo'
import { AcceptedColumnsInfo } from './TransferTableInfo/FinanceTransferAcceptInfo'
import { RejectedColumnsInfo } from './TransferTableInfo/FinanceTransferRejectInfo'

const FinanceTransfer = () => {
    const { transferPending, transferAccepted, transferRejected } = useSelector(state => state.adminTransfer, shallowEqual)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(adminTransferActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod()
    }, [callMethod])
    return (
        <div className='dashboard'>
            <FinanceHeader headerTitle='Transfer pending List' />

            <div className='row my-auto center'>
                {transferPending.length !== 0 ? <MakeTable columnsInfo={columnsInfo} columnData={transferPending} /> :
                    <div className='card card-body'>
                        <h4>There is no entity</h4>
                    </div>}
            </div>
            <FinanceHeader headerTitle='Accepted transfer list' />

            <div className='row my-auto center'>
                {transferAccepted.length !== 0 ? <MakeTable columnsInfo={AcceptedColumnsInfo} columnData={transferAccepted} /> :
                    <div className='card card-body'>
                        <h4>There is no entity</h4>
                    </div>}
            </div>
            <FinanceHeader headerTitle='Rejected transfer list' />

            <div className='row my-auto center'>
                {transferRejected.length !== 0 ? <MakeTable columnsInfo={RejectedColumnsInfo} columnData={transferRejected} /> :
                    <div className='card card-body'>
                        <h4>There is no entity</h4>
                    </div>}
            </div>

        </div>
    );
};

export default FinanceTransfer;