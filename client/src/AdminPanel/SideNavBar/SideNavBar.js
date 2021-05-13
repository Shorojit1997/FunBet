import React,{useEffect} from 'react';
import { AiOutlineCreditCard, AiOutlineGift, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector, shallowEqual } from 'react-redux'
import {adminDashboardAction} from '../../Store/Actions/Admin/AdminDashboardAction'

const SideNavBar = ({ toogle, setToogle }) => {
    const { dashboard } = useSelector(state => state.adminDashboard, shallowEqual);
    const{notifications}=useSelector(state=>state.adminNotification,shallowEqual)
    const { generalSettings,colorSettings } = useSelector(state => state.settings, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(adminDashboardAction())
    }, [dispatch])
    return (
        <>
            <div className='side_nav_bar_main' style={{background:`${colorSettings.adminNavBackground}`}}>
                <div onClick={() => { setToogle(!toogle) }} className='side_nav_bar_toogle' style={{borderLeft:'1px solid gray'}}>
                    {toogle ? <AiOutlineClose style={{ color:colorSettings.adminNavTextColor }} /> : <AiOutlineMenu style={{ color:colorSettings.adminNavTextColor }} />}
                </div>
                <div className='side_nav_right_div'>
                    <div className='side_nav_bar_right'>
                        <div className='side_nav_bar_right_first_ul'>
                            <div className='side_nav_bar_right_first_li' style={{ fontSize: `25px`,color:colorSettings.adminNavTextColor }}>${parseInt(dashboard.balance)}</div>
                            <div onClick={(e) => { history.push('/admin/finance/withdraw') }} className='side_nav_bar_right_first_li'><AiOutlineCreditCard  style={{ fontSize: '30px',color:colorSettings.adminNavTextColor }}/><div className='notifications'>{dashboard.withdrawPending}</div></div>
                            <div onClick={(e) => { history.push('/admin/finance/deposit') }} className='side_nav_bar_right_first_li'><AiOutlineGift style={{ fontSize: '30px',color:colorSettings.adminNavTextColor }} /><div className='notifications'>{dashboard.depositPending}</div></div>
                            <div onClick={(e) => { history.push('/admin/bet/notification') }} className='side_nav_bar_right_first_li '><IoMdNotificationsOutline style={{ fontSize: '30px',color:colorSettings.adminNavTextColor }} /><div className='notifications'>{notifications.length>9? '9+':notifications.length}</div></div>
                        </div>
                    </div>
                    <div className='side_nav_bar_profile'>
                        <div className='side_nav_bar_profile_pic'><img src={generalSettings.logoUrl} alt='navpicture'></img> </div>
                       
                    </div>
                </div>
            </div >
        </>
    );
};

export default SideNavBar;