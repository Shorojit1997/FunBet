import React, { useEffect,useCallback } from 'react';
import UserHeader from './UserHeader'
import MakeTable from '../Table/MakeTable';
import { columnsInfo } from './UserAdminTableInfo/UserListInfo'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {adminDetailsActionHandeler} from '../../Store/Actions/Admin/AdminListAction'


const UserAdmin = () => {
    const { adminList } = useSelector(state => state.adminList,shallowEqual);
     const dispatch = useDispatch();

     const callMethod=useCallback(()=>{
        dispatch(adminDetailsActionHandeler());
     },[dispatch])

    useEffect(() => {
        callMethod()
    }, [callMethod])
    return (
        <div className='dashboard'>
            <UserHeader headerTitle='Admin List' />

            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={adminList} />}
            </div>
        </div>
    );
};

export default UserAdmin;