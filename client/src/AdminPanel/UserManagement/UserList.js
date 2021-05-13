import React, { useEffect,useCallback } from 'react';
import UserHeader from './UserHeader'
import MakeTable from '../Table/MakeTable';
import { columnsInfo } from './UserTableInfo/AdminUserListInfo'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminUserDetailsActionHandeler } from '../../Store/Actions/Admin/AdminUserListAction'

const UserList = () => {
    const { userList } = useSelector(state => state.userList, shallowEqual);
    const dispatch = useDispatch();
    const callMethod=useCallback(()=>{
        dispatch(adminUserDetailsActionHandeler());
     },[dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <UserHeader headerTitle='User List' />
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={userList} />}
            </div>
        </div>
    );
};

export default UserList;