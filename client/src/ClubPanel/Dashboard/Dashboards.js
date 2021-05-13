import React, { useEffect, useCallback } from 'react';
import DashboardItem from './DashboardItem';
import DashbordHeader from './DashbordHeader';
import { AiOutlineUser } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'
import { FcFeedback } from 'react-icons/fc'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {clubDashboardAction} from '../../Store/Actions/Club/ClubDashboardAction'

const Dashboards = () => {
    const { dashboard } = useSelector(state => state.clubDashboard, shallowEqual);
    const dispatch = useDispatch()
    const itemInfo = [
        {
            symbol: '$',
            name: 'My Balance',
            number: `৳${dashboard.amount}`,
            color: 'rgba(246,114,167,.25)'
        },
        {
            symbol: <BiRename />,
            name: 'Club Name',
            number: `${dashboard.clubName}`,
            color: 'rgba(246,114,167,.25)'
        },
        {
            symbol: <AiOutlineUser />,
            name: 'Total Club Members',
            number: dashboard.userlist ? dashboard.userlist.length : '0',
            color: 'rgba(102,88,221,.25)'
        },
        {
            symbol: <FcFeedback />,
            name: 'Total withdrawal',
            number: `৳${dashboard.totalWithdraw ? dashboard.totalWithdraw : '0'}`,
            color: 'rgba(102,88,221,.25)'
        }
    ]
    const getPost = useCallback(() => {
        dispatch(clubDashboardAction());
    }, [dispatch])

    useEffect(() => {
        getPost();
    }, [getPost])
    return (
        <div className='dashboard'>
            <DashbordHeader headerTitle='Dashboard' />
            <div className='row my-auto'>
                <DashboardItem itemData={itemInfo[0]} />
                <DashboardItem itemData={itemInfo[1]} />
                <DashboardItem itemData={itemInfo[2]} />
                <DashboardItem itemData={itemInfo[3]} />

            </div>

        </div>
    );
};

export default Dashboards;