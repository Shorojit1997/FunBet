import React, { useEffect,useCallback } from 'react';
import { adminCardBetListActionHandeler } from '../../../Store/Actions/Admin/AdminCardAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {columnsInfo} from './CardTableInfo'
import MakeTable from '../../Table/MakeTable'


const CoinList = () => {

    const dispatch = useDispatch();
    const{cardList} =useSelector(state=>state.adminCard,shallowEqual)

    const callMethod = useCallback(() => {
        dispatch(adminCardBetListActionHandeler());
    }, [dispatch])

    useEffect(() => {
        callMethod();
    },[callMethod])

    return (
        <div className='dashboard'>
        <div className='row my-auto '>
            <div className='col-6 text-left '><h5>Card bets list</h5> </div>
    
        </div>
        <div className='row my-auto center'>
            { <MakeTable columnsInfo={columnsInfo} columnData={cardList} />}
        </div>
    </div>
    );
};

export default CoinList;