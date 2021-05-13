import { BrowserRouter, Switch, Redirect } from 'react-router-dom'

import React, { useEffect, useCallback, lazy, Suspense } from 'react'
import {NotificationsAction} from '../Store/Actions/NotificationAction'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import axios from 'axios'
import * as Types from '../Store/Types'

import '../CssFile/CarrouselDiv.css'
import '../CssFile/Footer.css'
import '../CssFile/FourOFour.css'
import '../CssFile/HomeBody.css'
import '../CssFile/LocalRouting.css'
import '../CssFile/MarqueText.css'
import '../CssFile/ModalExample.css'
import '../CssFile/NavBarFile.css'
import '../CssFile/StatementCssFile.css'

const Footer = lazy(() => import('../pages/Footer/Footer'));
const SportsNotice = lazy(() => import('../pages/HomeBody/SportsNotice'));
const MarqueeText = lazy(() => import('../pages/marqueeText/MarqueeText'));
const MultipleItems = lazy(() => import('../pages/SlickSlider/MultipleItems'));
const BankDeposit = lazy(() => import('../pages/Deposit/BankDeposit'));
const BankWithdraw = lazy(() => import('../pages/Withdraw/BankWithdraw'));
const PrivateRouting = lazy(() => import('./PrivateRouting'));
const AuthLogin = lazy(() => import('../pages/Auth/Login/AuthLogin'));
const AuthSignup = lazy(() => import('../pages/Auth/Signup/AuthSignup'));
const BankTransfer = lazy(() => import('../pages/Transfer/BankTransfer'));
const BetPage = lazy(() => import('../pages/Statement/Bets/BetPage'));
const DepositPage = lazy(() => import('../pages/Statement/Deposits/DepositPage'));
const Transfer = lazy(() => import('../pages/Statement/Transfer/Transfer'));
const WithdrawPage = lazy(() => import('../pages/Statement/Withwdraws/WithdrawPage'));
const FourOFour = lazy(() => import('../pages/4O4/FourOFour'));
const Sponsor = lazy(() => import('../pages/Sponsor/Sponsor'));
const NavBarFile = lazy(() => import('../Navbar/NavBarFile'));
const Profile = lazy(() => import('../pages/Auth/Profile/Profile'));
const AfterLoginRoute = lazy(() => import('./AfterLoginRoute'));
const HomeBodyMain = lazy(() => import('../pages/HomeBody/HomeBodyMain'));
const GameSlider = lazy(() => import('../GameSlider/GameSlider'));
const GameBetPage = lazy(() => import('../pages/Statement/Gamebets/BetPage'));
const SliderImage = lazy(() => import('../pages/SliderImage/SliderImage'));
const PlayNow =lazy(()=>import('../GameSlider/PlayNow'))


const loading = (
    <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
        <div className="spinner-border  text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const LocalRouting = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.login, shallowEqual)

    const checkDate = useCallback(async() => {
        axios.get('/api/user/is_login')
            .then(res => {
                if (!res.data.isUserLogin) {
                    localStorage.removeItem('authSecret')
                    dispatch({ type: Types.LOGIN_ERROR, payload: { flashMessage: 'Please login..' } })
                }
                else if (res.data.isUserLogin) {
                    dispatch({ type: Types.LOGIN_USER_UPDATE, payload: { authInformations: res.data.authInformation } })
                }
            })
            .catch(e => {

            })
    }, [dispatch])

    const getNotifications=useCallback(()=>{
        dispatch(NotificationsAction());

    },[dispatch])

    useEffect(() => {
        checkDate();
        // getNotifications();
        const interval = setInterval(() => {
            checkDate();
            getNotifications();
        }, 1000 * 60)
        return () => clearInterval(interval);

    }, [checkDate,getNotifications])

    return (
        <>
            <BrowserRouter>
                <NavBarFile />
                {!isAuthenticated && <>
                    <AfterLoginRoute exact path='/login' component={AuthLogin} />
                    <AfterLoginRoute exact path='/signup' component={AuthSignup} />
                    <Redirect to='/login' />
                </>}
                {
                    isAuthenticated &&
                    <>
                        <div className='first_div'></div>
                        <SliderImage />
                        <MultipleItems />
                        <MarqueeText />
                        <div className='row'>

                            <div className='col-12 col-lg-3'>
                                <GameSlider />
                            </div>
                            <div className='col-12 col-lg-7 mb-2' style={{ background: 'none', borderRadius: '10px' }} >
                                <Suspense fallback={loading}>

                                    <Switch>
                                        <PrivateRouting exact path='/' component={HomeBodyMain} />
                                        <PrivateRouting exact path='/deposit' component={BankDeposit} />
                                        <PrivateRouting exact path='/withdraw' component={BankWithdraw} />
                                        <PrivateRouting exact path='/transfer' component={BankTransfer} />
                                        <PrivateRouting exact path='/games/play' component={PlayNow} />
                                        <PrivateRouting exact path='/sponsor' component={Sponsor} />
                                        <PrivateRouting exact path='/profile' component={Profile} />
                                        <PrivateRouting exact path='/statement/bets' component={BetPage} />
                                        <PrivateRouting exact path='/statement/games/bets' component={GameBetPage} />
                                        <PrivateRouting exact path='/statement/deposit' component={DepositPage} />
                                        <PrivateRouting exact path='/statement/transfer' component={Transfer} />
                                        <PrivateRouting exact path='/statement/withdraw' component={WithdrawPage} />
                                        <AfterLoginRoute exact path='*' component={FourOFour} />
                                    </Switch>
                                </Suspense>

                            </div>
                            <div className='col-12 col-lg-2'>
                                <SportsNotice cardHeaderText='Betting Notices' />
                            </div>

                        </div>
                        <Footer />
                    </>}
            </BrowserRouter>
        </>
    );
};

export default React.memo(LocalRouting);