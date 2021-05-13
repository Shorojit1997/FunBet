import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector,shallowEqual} from 'react-redux'

const AfterLoginRoute = ({ component: Component, ...rest }) => {

    const {isAuthenticated} =useSelector(state=>state.login,shallowEqual)
    
    return (
        <Route {...rest} render={(props) => {
            if (isAuthenticated) {
                return <Redirect to='/' />
            }else{
                return (<Component {...props} />)
            }
        }} />

    );

};

export default AfterLoginRoute;