import React, { useEffect} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import MakeTable from '../../Table/MakeTable';
import {adminClubSendActionHandeler} from '../../../Store/Actions/Club/AdminClubMessagAction'
import {sendtable} from '../TableInfo'

const SendMessage = () => {
    const {sendlist} =useSelector(state=>state.adminClubMessage,shallowEqual)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminClubSendActionHandeler());
    }, [dispatch])

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Send message</h5> </div>
                
            </div>
            <div className='row my-auto center'>
                { <MakeTable columnsInfo={sendtable} columnData={sendlist} />}
            </div>
        </div>
    );
};

export default SendMessage;