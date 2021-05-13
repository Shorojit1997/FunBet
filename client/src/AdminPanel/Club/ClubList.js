
import React, { useEffect, useCallback } from 'react';
import MakeTable from '../Table/MakeTable';
import { columnsInfo } from './TableInfo'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { clubListActionHandeler } from '../../Store/Actions/Club/AdminClublistAction'


const UserAdmin = () => {
    const { clublist } = useSelector(state => state.adminClublist, shallowEqual);
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(clubListActionHandeler());
    }, [dispatch])

    useEffect(() => {
        callMethod()
    }, [callMethod])
    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Club List</h5> </div>
            </div>

            <div className='row my-auto center'>
                {clublist.length !== 0 && <MakeTable columnsInfo={columnsInfo} columnData={clublist} />}
            </div>
        </div>
    );
};

export default UserAdmin;