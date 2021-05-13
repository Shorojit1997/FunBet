import React,{useEffect} from 'react';
// import './SideNavBar.css'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import {useDispatch } from 'react-redux'
import {clubDashboardAction} from '../../Store/Actions/Club/ClubDashboardAction'

const SideNavBar = ({ toogle, setToogle }) => {
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(clubDashboardAction())
    }, [dispatch])
    return (
        <>
            <div className='side_nav_bar_main' >
                <div onClick={() => { setToogle(!toogle) }} className='side_nav_bar_toogle'>
                    {toogle ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div>
                <div className='side_nav_right_div'>
                    <div className='side_nav_bar_profile'>
                        <div className='side_nav_bar_profile_pic'><img src='/images/profileicon.jpg' alt='navpicture'></img> </div>
                    
                    </div>
                </div>
            </div >
        </>
    );
};

export default SideNavBar;