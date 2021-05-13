import React, { useEffect, useCallback } from 'react';

import MakeTable from '../../AdminPanel/Table/MakeTable';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { clubListActionHandeler } from '../../Store/Actions/Club/ClubMemberAction'
import { columnsInfo } from './MemberTableInfo'

const Member = () => {
    const {clubMember } = useSelector(state => state.clubMember, shallowEqual)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(clubListActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    return (
        <div className='dashboard'>
            <div className='row my-auto '><div className='col-6 text-left '><h5>Club members</h5> </div> </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={clubMember} />}
            </div>


        </div>
    );
};

export default Member;