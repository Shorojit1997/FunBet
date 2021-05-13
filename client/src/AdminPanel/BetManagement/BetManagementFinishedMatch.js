import React, { useEffect } from 'react';
import { adminBetsFinishedActionHandeler } from '../../Store/Actions/Admin/AdminBetAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { columnsInfo } from './FinishedInfo/FinishedTableInfo'
import MakeTable from '../Table/MakeTable'


const BetManagementHidenMatch = () => {
    const dispatch = useDispatch();
    const { finishedList } = useSelector(state => state.adminBets, shallowEqual)

    useEffect(() => {
        dispatch(adminBetsFinishedActionHandeler());
    }, [dispatch])


    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Finished match</h5> </div>
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={finishedList} />}
            </div>
        </div>
    );
};

export default BetManagementHidenMatch;