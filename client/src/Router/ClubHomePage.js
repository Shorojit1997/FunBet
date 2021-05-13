import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import * as Types from '../Store/Types'
import routes from './ClubRoutes'


import '../CssFile/AdminCss/AdminLogin.css'
import '../CssFile/AdminHomePage.css'
import '../CssFile/AdminFooter.css'
import '../CssFile/Dashboard.css'
import '../CssFile/FourOFour.css'
import '../CssFile/Games.css'
import '../CssFile/HomeBody.css'
import '../CssFile/ModalExample.css'
import '../CssFile/SearchBar.css'
import '../CssFile/Setting.css'
import '../CssFile/SideNavBar.css'

const ClubLogin = lazy(() => import('../ClubPanel/Pages/ClubLogin'));
const ClubSignup = lazy(() => import('../ClubPanel/Pages/ClubSignup'))
const SideNavBar = lazy(() => import('../ClubPanel/SideNavBar/SideNavBar'))
const SideToogleBar = lazy(() => import('../ClubPanel/SideNavBar/SideToogleBar'));
const BeforeLoginClubRoute = lazy(() => import('./BeforeLoginClubRoute'))
const AfterLoginClubRoute = lazy(() => import('./AfterLoginClubRoute'));
const AdminFooter = lazy(() => import('../ClubPanel/Footer/AdminFooter'));




const loading = (
    <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
        <div className="spinner-border  text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const ClubHomePage = () => {
    let { url } = useRouteMatch();
    const [toogle, setToogle] = useState(false);
    const dispatch = useDispatch();
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const { isClubAuthenticated } = useSelector(state => state.clubLogin, shallowEqual);

    const checkDate = useCallback(() => {
        axios.get('/api/club/is_login')
            .then(res => {
                if (!res.data.isClubLogin) {
                    localStorage.removeItem('clubAuthSecret')
                    dispatch({ type: Types.CLUB_LOGIN_ERROR, payload: { error: {} } })
                }
            }).catch(e => {
            })
    }, [dispatch])

    useEffect(() => {
        checkDate();
        const interval = setInterval(() => {
            checkDate()
        }, 1000 * 60)
        return () => clearInterval(interval);

    }, [checkDate])



    return (
        <div>
            <BrowserRouter>
                {!isClubAuthenticated &&
                    <Switch>
                        <AfterLoginClubRoute exact path={`${url}/signup`} component={ClubSignup} />
                        <AfterLoginClubRoute exact path={`${url}/login`} component={ClubLogin} />
                        <Redirect to='/club/login' />
                    </Switch>}
                <Switch>
                    {
                        isClubAuthenticated &&
                        <>
                            <div className='admin_body' style={{ zIndex: '1', background: `${colorSettings.adminNavBackground}`, }}>
                                <div style={{ zIndex: '1', background: `${colorSettings.adminNavBackground}`, }} className={`${toogle ? 'admin_side_navbar set_display_flex' : 'admin_side_navbar set_display_none'}`} >
                                    <SideToogleBar toogle={toogle} setToogle={setToogle} />
                                </div>
                                <div className='admin_dashbord_body' style={{ background: `${colorSettings.adminBackground}`, minHeight: '100vh' }} >
                                    <SideNavBar toogle={toogle} setToogle={setToogle} />
                                    
                                    <Suspense fallback={loading}>
                                        {
                                            routes.map((route, index) => {
                                                return <BeforeLoginClubRoute key={index} exact path={`${url}${route.path}`} component={route.handeler} />
                                            })
                                        }
                                    </Suspense>
                                    <AdminFooter />
                                </div>
                            </div>
                        </>
                    }

                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default React.memo(ClubHomePage);