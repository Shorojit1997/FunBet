import React, { useEffect, useCallback } from 'react';
import { adminLudoBetListActionHandeler } from '../../../Store/Actions/Admin/AdminGameBetAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { columnsInfo } from './LudoTableInfo'
import MakeTable from '../../Table/MakeTable'


const LudoList = () => {

    const dispatch = useDispatch();
    const { ludoList } = useSelector(state => state.adminGame, shallowEqual)

    const callMethod = useCallback(() => {
        dispatch(adminLudoBetListActionHandeler());
    }, [dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Ludo bets list</h5> </div>

            </div>
            <div className='row my-auto center'>
                { <MakeTable columnsInfo={columnsInfo} columnData={ludoList} />
                }
            </div>
        </div>
    );
};

export default LudoList;