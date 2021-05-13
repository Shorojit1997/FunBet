import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector,shallowEqual} from 'react-redux' 


const BeforeLoginClubRoute = ({component:Component,...rest}) => {
    const {isClubAuthenticated}=useSelector(state=>state.clubLogin,shallowEqual);

    return(
        <Route {...rest} render={(props)=>{
            if(isClubAuthenticated){
                return (<Component {...props} />)
            }
            else {
                return <Redirect to='/club/login' />
            }
        }} />

    );
      
};

export default BeforeLoginClubRoute;