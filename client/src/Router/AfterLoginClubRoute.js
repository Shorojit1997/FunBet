import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector,shallowEqual} from 'react-redux' 
const AfterLoginClubRoute = ({ component: Component, ...rest }) => {
    const {isClubAuthenticated}=useSelector(state=>state.clubLogin,shallowEqual);
    return (
        <Route {...rest} render={(props) => {
            if (isClubAuthenticated) {
                return <Redirect to='/club/dashboard' />
            }else{
                return (<Component {...props} />)
            }
        }} />

    );

};

export default AfterLoginClubRoute;