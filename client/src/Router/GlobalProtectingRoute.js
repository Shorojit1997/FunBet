import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector,shallowEqual} from 'react-redux' 


const GlobalProtectingRoute = ({component:Component,...rest}) => {
    const {isAdminAuthenticated}=useSelector(state=>state.adminLogin,shallowEqual);

    return(
        <Route {...rest} render={(props)=>{
            if(isAdminAuthenticated){
                return (<Component {...props} />)
            }
            else {
                return <Redirect to='/admin/login' />
            }
        }} />

    );
      
};

export default GlobalProtectingRoute;