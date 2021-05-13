import React from 'react';

import { NavLink } from 'react-router-dom'
// react icons 
import { MdDashboard } from 'react-icons/md'
import{HiReceiptRefund}  from 'react-icons/hi'
import { AiOutlineCreditCard,AiOutlineUsergroupAdd, AiOutlineOrderedList,AiOutlineLogout,AiOutlineSend} from 'react-icons/ai'

import * as Types from '../../Store/Types'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const styles={ color: 'white' };
const styles1={
    backgroundColor:"rgb(11, 76, 114)"
}
const SideToogleBar = ({ toogle, setToogle }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { generalSettings } = useSelector(state => state.settings, shallowEqual)

 
    const logoutHandeler = () => {
        axios.post('/api/club/logout')
            .then(data => {
                localStorage.removeItem('clubAuthSecret');
                dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: {error: {}} })
                history.push('/club/login')
            })
    }
    const clickHandeler = () => {
        setToogle(!toogle)
    }
    return (
        <div style={styles1} className='_sidebar' >
            <div  className='_sidebar_text'>{generalSettings.websiteName ? generalSettings.websiteName : "5WICKETS"}</div>
            <ul className='_sidebar_ul'>
                <li onClick={clickHandeler} className='_sidebar_ul_li'> <NavLink style={styles}  to='/club/dashboard' ><MdDashboard />  Dashboard</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/club/members"><AiOutlineUsergroupAdd /> Club Members</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/club/message/send"><AiOutlineSend /> Send Message</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/club/message/received"><HiReceiptRefund /> Received Message</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/club/withdraws"><AiOutlineCreditCard style={{ fontSize: '23px' }} /> Withdraws</NavLink></li>
                <li onClick={clickHandeler} className='_sidebar_ul_li'><NavLink style={styles}  to="/club/withdraws_list"><AiOutlineOrderedList style={{ fontSize: '23px' }} /> Withdraws List</NavLink></li>
                <li onClick={logoutHandeler} className='_sidebar_ul_li'><AiOutlineLogout /> Logout</li>

            </ul>
        </div>
    );
};

export default SideToogleBar;