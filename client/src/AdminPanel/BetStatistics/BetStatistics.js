import React, { useEffect, useCallback } from 'react';
import { adminPlaceBetsActionHandeler } from '../../Store/Actions/Admin/AdminPlaceBetsAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {columnsInfo} from './BetStatisticsTable'
import MakeTable from '../Table/MakeTable'


const BetStatistics = () => {

    const dispatch = useDispatch();
    const{placeBetsList} =useSelector(state=>state.adminPlaceBets,shallowEqual)

    const calMethod=useCallback(()=>{
        dispatch(adminPlaceBetsActionHandeler());
    },[dispatch])
    useEffect(() => {
       calMethod()
    }, [calMethod])

    return (
        <div className='dashboard'>
        <div className='row my-auto '>
            <div className='col-6 text-left '><h5>Bets Statistics</h5> </div>
    
        </div>
        <div className='row my-auto center'>
            {<MakeTable columnsInfo={columnsInfo} columnData={placeBetsList} />}
        </div>
    </div>
    );
};

export default BetStatistics;