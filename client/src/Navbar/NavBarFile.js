import React, { useState } from 'react';
import { AiOutlineCreditCard, AiOutlineGift, AiOutlineMenu, AiOutlineLogout, AiOutlineClose, AiOutlineLogin } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { SiGnuprivacyguard } from 'react-icons/si'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { animateScroll } from 'react-scroll'
import *  as Types from '../Store/Types'
import axios from 'axios'
import Notification from '../pages/Notification/Notification';

const NavBarFile = () => {
    const [toogle, setToogle] = useState(false)
    const [popover, setPopover] = useState(false)
    const [toogelDropdown, setToogleDropdown] = useState(false)
    const [profileToogle, setProfileToogle] = useState(false);

    const { isAuthenticated, authInformations } = useSelector(state => state.login, shallowEqual);
    const { colorSettings } = useSelector(state => state.settings, shallowEqual)
    const { notifications } = useSelector(state => state.notifications, shallowEqual)
    const dispatch = useDispatch()

    const history = useHistory();

    const logoutHandeler = () => {
        axios.post('/api/user/logout')
            .then(data => {
                localStorage.removeItem('authSecret');
                dispatch({ type: Types.LOGIN_ERROR, payload: { error: {} } })
                history.push('/login')
            })
            .catch(error => {

            })

    }

    return (
        <div className='nav_bar_main' style={{ background: colorSettings.userNavBackground }}  >
            <div className='nav_bar_logo'>
                <div onClick={() => { history.push('/'); animateScroll.scrollToTop() }} className='nav_bar_logo_text' >5WICKETS</div>
            </div>
            <div className='nav_bar_sub_main'>
                {
                    isAuthenticated && <div onClick={() => { setToogle(!toogle) }} className='nav_bar_toogle'>
                        {toogle ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </div>
                }

                {
                    isAuthenticated ? (
                        <>
                            <div className='c_nav_bar_left'>
                                <ul className='c_nav_bar_left_first_ul'>
                                    <li onClick={() => { animateScroll.scrollTo(600) }} className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} exact to='/' >HOME</NavLink></li>
                                    <li onClick={() => { animateScroll.scrollTo(600) }} className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to='/deposit' >DEPOSIT</NavLink></li>
                                    <li onClick={() => { animateScroll.scrollTo(600) }} className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to="/withdraw">WITHDRAW</NavLink></li>
                                    <li onClick={() => { animateScroll.scrollTo(600) }} className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to="/transfer">TRANSFER</NavLink></li>
                                    <li onClick={() => { setToogleDropdown(!toogelDropdown) }} className='c_nav_bar_left_first_li'>
                                        <div >STATEMENT <RiArrowDropDownLine /></div>
                                        {
                                            toogelDropdown && (
                                                <div className='c_first_dropdown'>
                                                    <div onClick={() => { animateScroll.scrollTo(600) }} className='c_first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/bets">Bets</NavLink></div>
                                                    <div onClick={() => { animateScroll.scrollTo(600) }} className='c_first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/games/bets">Game bets</NavLink></div>
                                                    <div onClick={() => { animateScroll.scrollTo(600) }} className='c_first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/deposit">Deposits</NavLink> </div>
                                                    <div onClick={() => { animateScroll.scrollTo(600) }} className='c_first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/withdraw">Withdraws</NavLink></div>
                                                    <div onClick={() => { animateScroll.scrollTo(600) }} className='c_first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/transfer">Transfer Account</NavLink></div>
                                                </div>
                                            )
                                        }

                                    </li>
                                    <li onClick={() => { animateScroll.scrollTo(600) }} className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to="/games/play">CASINO</NavLink></li>
                                    {/* <li className='c_nav_bar_left_first_li'><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to="/sponsor">LUDO</NavLink></li> */}
                                </ul>
                            </div>
                            {/* copy html */}
                            {
                                toogle && (
                                    <div className='nav_bar_left'>
                                        <ul className='nav_bar_left_first_ul'>
                                            <li onClick={() => { setToogle(!toogle); animateScroll.scrollToTop() }} className='nav_bar_left_first_li'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'red' }} exact to='/' >HOME</NavLink></li>
                                            <li onClick={() => { setToogle(!toogle); window.innerWidth <= 600 && animateScroll.scrollTo(600) }} className='nav_bar_left_first_li'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'red' }} to='/deposit' >DEPOSIT</NavLink></li>
                                            <li onClick={() => { setToogle(!toogle); window.innerWidth <= 600 && animateScroll.scrollTo(600) }} className='nav_bar_left_first_li'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'red' }} to="/withdraw">WITHDRAW</NavLink></li>
                                            <li onClick={() => { setToogle(!toogle); window.innerWidth <= 600 && animateScroll.scrollTo(600) }} className='nav_bar_left_first_li'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'red' }} to="/transfer">TRANSFER</NavLink></li>
                                            <li onClick={() => { setToogleDropdown(!toogelDropdown) }} className='nav_bar_left_first_li'>
                                                <div>STATEMENT <RiArrowDropDownLine /></div>
                                                {
                                                    toogelDropdown && (
                                                        <div className='first_dropdown'>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/bets">Bets</NavLink></div>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/games/bets">Game bets</NavLink></div>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/deposit">Deposits</NavLink> </div>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/withdraw">Withdraws</NavLink></div>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/transfer">Transfer Account</NavLink></div>
                                                            <div onClick={() => { setToogle(!toogle); animateScroll.scrollTo(700) }} className='first_dropdown_item'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'black' }} to="/statement/notification">Notifications</NavLink> </div>
                                                        </div>
                                                    )
                                                }
                                            </li>

                                            <li onClick={() => { setToogle(!toogle); window.innerWidth <= 600 && animateScroll.scrollTo(800) }} className='nav_bar_left_first_li'><NavLink style={{ color: 'black' }} activeStyle={{ color: 'red' }} to="/games/play">CASINO</NavLink></li>
                                        </ul>
                                    </div>
                                )
                            }
                            {
                                popover && <Notification
                                    modal={popover}
                                    setModal={setPopover}
                                />
                            }
                            <div className='nav_bar_right'>
                                <div className='nav_bar_right_first_ul'>
                                    <div className='nav_bar_right_first_li'>${parseInt(authInformations.amount)}</div>
                                    <div onClick={() => { animateScroll.scrollTo(700) }} className='nav_bar_right_first_li'><NavLink style={{ color: 'green' }} activeStyle={{ color: 'red' }} to="/statement/withdraw"> <AiOutlineCreditCard style={{ fontSize: '23px' }} /></NavLink></div>
                                    <div onClick={() => { animateScroll.scrollTo(700) }} className='nav_bar_right_first_li'><NavLink style={{ color: 'green' }} activeStyle={{ color: 'red' }} to="/statement/transfer"><AiOutlineGift style={{ fontSize: '23px' }} /></NavLink></div>
                                    <div onClick={() => setPopover(true)} id='Popover1' className='nav_bar_right_first_li '><IoMdNotificationsOutline style={{ fontSize: '25px' }} /><div className='notifications'>{notifications.length}</div></div>
                                </div>
                            </div>
                            <div onClick={() => { setProfileToogle(!profileToogle) }} className='nav_bar_profile'>
                                <div className='nav_bar_profile_pic'><img src='/images/profileIcon.jpg' alt='navpicture'></img> </div>
                                {
                                    profileToogle &&
                                    <div className='nav_bar_profile_dropdown'>
                                        <div className='nav_bar_profile_dropdown_item'><NavLink style={{ color: 'black', width: '100%' }} activeStyle={{ color: 'black' }} to="/profile"> <CgProfile /> Profile  </NavLink></div>
                                        {/* <button className='nav_bar_profile_dropdown_item'><CgProfile /> Profile</button> */}
                                        <button onClick={logoutHandeler} className='nav_bar_profile_dropdown_item'><AiOutlineLogout /> Logout</button>
                                    </div>
                                }

                            </div>
                        </>

                    ) :
                        (
                            <>
                                <div className='login_nav_bar_width'>
                                    <div className='login_nav_bar_ul'>
                                        <div onClick={() => { history.push('/signup') }} className='login_nav_bar_li'><SiGnuprivacyguard /> <NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to='/signup' >Signup</NavLink></div>
                                        <div onClick={() => { history.push('/login') }} className='login_nav_bar_li'> <AiOutlineLogin /><NavLink style={{ color: 'white' }} activeStyle={{ color: 'yellow' }} to='/login' >Login</NavLink></div>
                                    </div>
                                </div>
                            </>

                        )
                }
            </div>

        </div >
    );
};

export default NavBarFile;