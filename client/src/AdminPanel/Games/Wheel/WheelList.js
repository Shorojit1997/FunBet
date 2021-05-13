import React, { useEffect } from 'react';
import { adminWheelBetListActionHandeler } from '../../../Store/Actions/Admin/AdminGameBetAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { columnsInfo } from './WheelTableInfo'
import MakeTable from '../../Table/MakeTable'


const LudoList = () => {

    const dispatch = useDispatch();
    const { wheelList } = useSelector(state => state.adminGame, shallowEqual)

    useEffect(() => {
        dispatch(adminWheelBetListActionHandeler());
    }, [dispatch])

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Wheel bets list</h5> </div>
            </div>
            <div className='row my-auto center'>
                { <MakeTable columnsInfo={columnsInfo} columnData={wheelList} />}
            </div>
        </div>
    );
};

export default LudoList;