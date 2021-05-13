import React, { useEffect,useCallback } from 'react';
import { adminEvenOddBetListActionHandeler } from '../../../Store/Actions/Admin/AdminEvenOddGameAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {columnsInfo} from './EvenTableInfo'
import MakeTable from '../../Table/MakeTable'


const EvenOddList = () => {

    const dispatch = useDispatch();
    const{evenList} =useSelector(state=>state.adminEven,shallowEqual)

    const callMethod = useCallback(() => {
        dispatch(adminEvenOddBetListActionHandeler());
    }, [dispatch])

    useEffect(() => {
        callMethod();
    },[callMethod])

    return (
        <div className='dashboard'>
        <div className='row my-auto '>
            <div className='col-6 text-left '><h5>Even-Odd bets list</h5> </div>
    
        </div>
        <div className='row my-auto center'>
            {<MakeTable columnsInfo={columnsInfo} columnData={evenList} />
            
        }
        </div>
    </div>
    );
};

export default EvenOddList;