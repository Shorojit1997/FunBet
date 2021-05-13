import React, { useEffect,useCallback } from 'react';
import { adminCoinBetListActionHandeler } from '../../../Store/Actions/Admin/AdminCoinGameAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {columnsInfo} from './CoinTableInfo'
import MakeTable from '../../Table/MakeTable'


const CoinList = () => {

    const dispatch = useDispatch();
    const{coinList} =useSelector(state=>state.adminCoin,shallowEqual)

    const callMethod = useCallback(() => {
        dispatch(adminCoinBetListActionHandeler());
    }, [dispatch])

    useEffect(() => {
        callMethod();
    },[callMethod])

    return (
        <div className='dashboard'>
        <div className='row my-auto '>
            <div className='col-6 text-left '><h5>Coin toss bets list</h5> </div>
    
        </div>
        <div className='row my-auto center'>
            { <MakeTable columnsInfo={columnsInfo} columnData={coinList} />
        
        }
        </div>
    </div>
    );
};

export default CoinList;