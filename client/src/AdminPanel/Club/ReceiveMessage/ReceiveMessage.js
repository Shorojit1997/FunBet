import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import MakeTable from '../../Table/MakeTable';
import {adminClubReceiveActionHandeler} from '../../../Store/Actions/Club/AdminClubMessagAction'
import {receivetable} from '../TableInfo'

const ReceiveMessage = () => {
    const {receivelist} =useSelector(state=>state.adminClubMessage,shallowEqual)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminClubReceiveActionHandeler());
    }, [dispatch])

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Received message</h5> </div>
                
            </div>
            <div className='row my-auto center'>
                <MakeTable columnsInfo={receivetable} columnData={receivelist} />
            </div>

        </div>
    );
};

export default ReceiveMessage;