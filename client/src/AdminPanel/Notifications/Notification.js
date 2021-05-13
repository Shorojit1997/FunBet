import React, { useEffect, useState, useCallback } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { adminNotificationsAction } from '../../Store/Actions/Admin/AdminNotificationAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { columnsInfo } from './NotificationsTableInfo';
import AddNotificationModal from './AddNotificationModal'
import MakeTable from '../Table/MakeTable'
const Notification = () => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const { notifications } = useSelector(state => state.adminNotification, shallowEqual)

    const getPost = useCallback(() => {
        dispatch(adminNotificationsAction());
    }, [dispatch])

    useEffect(() => {
        getPost()
    }, [getPost])
    return (
        <div className='dashboard'>
            <div className='row my-auto '>

                <div className='col-6 text-left '><h5>Notifications</h5> </div>
                <div className='col-6 text-right'>
                    {modal && <AddNotificationModal modal={modal} setModal={setModal} />}
                    <button onClick={() => { setModal(!modal) }} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                </div>
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={notifications} />}
            </div>
        </div>
    );
};

export default Notification;