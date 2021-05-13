import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector,shallowEqual} from 'react-redux'


const PrivateRouting = ({component:Component,...rest}) => {
  const{ isAuthenticated}=useSelector(state=>state.login,shallowEqual)
    return(
        <Route {...rest} render={(props)=>{
            if(isAuthenticated){
                return (<Component {...props} />)
            }
            else {
                return <Redirect to='/login' />
            }
        }} />

    );
      
};

export default PrivateRouting;