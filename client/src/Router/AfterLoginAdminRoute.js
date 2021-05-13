import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector, shallowEqual } from 'react-redux'
const AfterLoginAdminRoute = ({ component: Component, ...rest }) => {
    const { isAdminAuthenticated } = useSelector(state => state.adminLogin, shallowEqual);
    return (
        <Route {...rest} render={(props) => {
            if (isAdminAuthenticated) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return (<Component {...props} />)
            }
        }} />

    );

};

export default AfterLoginAdminRoute;