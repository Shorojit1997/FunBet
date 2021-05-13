import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import * as Types from '../Store/Types'
import routes from './AdminRoutes'


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

const AdminLogin = lazy(() => import('../AdminPanel/Pages/AdminLogin'));
const SideNavBar = lazy(() => import('../AdminPanel/SideNavBar/SideNavBar'))
const SideToogleBar = lazy(() => import('../AdminPanel/SideNavBar/SideToogleBar'));
const GlobalProtectingRoute = lazy(() => import('./GlobalProtectingRoute'))
const AfterLoginAdminRoute = lazy(() => import('./AfterLoginAdminRoute'));
const AdminFooter = lazy(() => import('../AdminPanel/Footer/AdminFooter'));
const FourOFour = lazy(() => import('../pages/4O4/FourOFour'));



const loading = (
    <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
        <div className="spinner-border  text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const AdminHomePage = () => {
    let { url } = useRouteMatch();
    const [toogle, setToogle] = useState(false);
    const dispatch = useDispatch();
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const { isAdminAuthenticated } = useSelector(state => state.adminLogin, shallowEqual);

    const checkDate = useCallback(() => {
        axios.get('/api/admin/is_login')
            .then(res => {
                if (!res.data.isAdminLogin) {
                    localStorage.removeItem('adminAuthSecret')
                    dispatch({ type: Types.LOGIN_ADMIN_ERROR, payload: { flashMessage: 'Please login..' } })
                }
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
                <Switch>
                    <Suspense fallback={loading}>
                        {!isAdminAuthenticated &&
                            <>
                                <AfterLoginAdminRoute exact path={`${url}/login`} component={AdminLogin} />
                                <Redirect to='/admin/login' />
                            </>}
                        {
                            isAdminAuthenticated &&
                            <>
                                <div className='admin_body' style={{ zIndex: '1', background: `${colorSettings.adminNavBackground}`, }}>
                                    <div style={{ zIndex: '1', background: `${colorSettings.adminNavBackground}`, }} className={`${toogle ? 'admin_side_navbar set_display_flex' : 'admin_side_navbar set_display_none'}`} >
                                        <SideToogleBar toogle={toogle} setToogle={setToogle} />
                                    </div>
                                    <div className='admin_dashbord_body' style={{ background: `${colorSettings.adminBackground}`, minHeight: '100vh' }} >
                                        <SideNavBar toogle={toogle} setToogle={setToogle} />
                                        <Suspense fallback={loading}>
                                            <Switch>
                                                {
                                                    routes.map((route, index) => {
                                                        return <GlobalProtectingRoute key={index} exact path={`${url}${route.path}`} component={route.handeler} />
                                                    })
                                                }

                                                <AfterLoginAdminRoute exact path='*' component={FourOFour} />
                                            </Switch>
                                        </Suspense>
                                        <AdminFooter />
                                    </div>
                                </div>
                            </>
                        }
                    </Suspense>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default React.memo(AdminHomePage);