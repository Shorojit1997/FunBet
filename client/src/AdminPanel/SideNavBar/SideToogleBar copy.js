import React, { useState } from 'react';


import { RiArrowDropDownLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
// react icons 
import { MdDashboard } from 'react-icons/md'
import { SiNintendogamecube, SiGoogletagmanager } from 'react-icons/si'
import { FcStatistics } from 'react-icons/fc'
import { AiOutlineAccountBook,AiOutlineNotification, AiOutlineUsergroupAdd, AiFillSetting, AiOutlineLogout,AiFillSecurityScan } from 'react-icons/ai'
import { GiStack,GiCardKingClubs } from 'react-icons/gi'

import * as Types from '../../Store/Types'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const styles={
    color: 'white'
}
const styles1={
    backgroundColor:"rgb(11, 76, 114)"
}

const SideToogleBar = ({ toogle, setToogle }) => {
    const [toogelDropdown, setToogleDropdown] = useState('')
    const [isToogle, setIstoogle] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const { generalSettings } = useSelector(state => state.settings, shallowEqual)

    const toogleHandeler = (str) => {
        setToogleDropdown(str);
        setIstoogle(!isToogle)
    }
    const isTrueCheck = (str) => {
        return toogelDropdown === str && isToogle;
    }
    const logoutHandeler = () => {
        axios.post('/api/admin/logout')
            .then(data => {
                localStorage.removeItem('adminAuthSecret');
                dispatch({ type: Types.LOGIN_ADMIN, payload: {} })
                history.push('/admin/login')
            })
    }
    const clickHandeler = () => {
        setToogle(!toogle)
    }

    return (
        <div  style={styles1} className='_sidebar' >
            <div   className='_sidebar_text'>{generalSettings.websiteName ? generalSettings.websiteName : "5wickets"}</div>
            <ul className='_sidebar_ul'>
                <li onClick={clickHandeler} className='_sidebar_ul_li'> <NavLink style={styles} exact to='/admin/dashboard' ><MdDashboard />  Dashboard</NavLink></li>
                <li  className='_sidebar_ul_li'>
                    <div onClick={() => { toogleHandeler('45') }} ><SiNintendogamecube /> Games<RiArrowDropDownLine /></div>
                    {
                        isTrueCheck('45') &&
                        <div className='_sidebar_ul'>
                             <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/card">Card</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/ludo">Ludo</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/wheel">Wheel</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/coin">Coin</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/even_odd">Even-Odd</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/games/controller">Controller</NavLink></div>
                        </div>
                    }
               </li>
               <li  className='_sidebar_ul_li'>
                    <div onClick={() => { toogleHandeler('99') }} ><GiCardKingClubs /> Club<RiArrowDropDownLine /></div>
                    {
                        isTrueCheck('99') &&
                        <div className='_sidebar_ul'>
                             <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/club/clublist">Club list</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/club/send_message">Send message</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/club/received_message">Received message</NavLink></div>
                            
                        </div>
                    }
               </li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/autostack"><GiStack /> Autostack</NavLink></li>
                <li className='_sidebar_ul_li'>
                    <div onClick={() => { toogleHandeler('1') }} ><SiGoogletagmanager /> Bet Managements<RiArrowDropDownLine /></div>
                    {
                        isTrueCheck('1') &&
                        <div className='_sidebar_ul'>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/bet/match">Match</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/bet/finished_match">Finished match</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/bet/gametype">Gametype</NavLink> </div>
                            {/* <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={{ color: 'white' }} activeStyle={{ background: '' }} to="/admin/bet/notification">Notifications</NavLink> </div> */}
                        </div>
                    }
                </li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/statistics"><FcStatistics /> Bet Statistics</NavLink></li>
                <li className='_sidebar_ul_li'>
                    <div onClick={() => { toogleHandeler('2') }} ><AiOutlineUsergroupAdd /> User Managements<RiArrowDropDownLine /></div>
                    {
                        isTrueCheck('2') &&
                        <div className='_sidebar_ul'>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/user/list">User</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/user/admin">Admin</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/signup"> Add Admin</NavLink></div>
                            
                        </div>
                    }
                </li>
                <li className='_sidebar_ul_li'>
                    <div onClick={() => { toogleHandeler('3') }} ><AiOutlineAccountBook /> Finance Managements<RiArrowDropDownLine /></div>
                    {
                        isTrueCheck('3') &&
                        <div className='_sidebar_ul'>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/finance/deposit"> Deposits</NavLink> </div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/finance/withdraw"> Withdraws</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/finance/transfer"> Balance Transfer</NavLink></div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/finance/payment"> Payment Method</NavLink> </div>
                            <div onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/finance/settings">Settings</NavLink></div>
                        </div>
                    }
                </li>
                
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/security"><AiFillSecurityScan /> Security</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/admin/settings"><AiFillSetting /> Settings</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles} to="/admin/bet/notification"><AiOutlineNotification /> Notifications</NavLink></li>
                <li onClick={logoutHandeler} className='_sidebar_ul_li'><AiOutlineLogout /> Logout</li>

            </ul>
        </div>
    );
};

export default SideToogleBar;