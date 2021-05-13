

export const loginErrorChecker=(userInfo)=>{
    const{email,password}=userInfo;
    let error={}
    if(!email){
        error.flashMessage='Please provide valid valid email..'
    }
    else if(email.length<5 || email.length >30){
        error.flashMessage='Email must be 6 to 30 character...'
    }
    else if(!password){
        error.flashMessage='Please provide your vaild password...'
    }
    else if(password.length<5 || password.length>30){
        error.flashMessage='Password must be 6 to 30 character...'
    }

    return error;

}