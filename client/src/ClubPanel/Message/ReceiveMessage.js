import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import MakeTable from '../../AdminPanel/Table/MakeTable';
import {ClubReceiveMessageAction} from '../../Store/Actions/Club/ClubMessageAction'
import {columnsInfo1} from './SendMessageTable'

const Autostack = () => {
    const {receivelist} =useSelector(state=>state.clubMessage,shallowEqual)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ClubReceiveMessageAction());
    }, [dispatch])

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Received message</h5> </div>
                
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo1} columnData={receivelist} />}
            </div>

        </div>
    );
};

export default Autostack;