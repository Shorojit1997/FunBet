import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import AlertMessage from '../../FlashMessage/AlertMessage';
import { loginActionHandeler } from '../../Store/Actions/Club/ClubLoginAction'


const ClubLogin = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const loginError =useSelector(state=>state.adminLogin.loginError)
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })

    const submitHandeler = (e) => {
    
         dispatch(loginActionHandeler(loginInfo,history))
    }

    return (
        <div className='deposit_main' style={{background:'none'}} >
            <div className='admin_deposit_div'>
                {
                    Object.keys(loginError).length !== 0 && <AlertMessage error={loginError} />
                }
                <div className='admin_deposit_header'>Club</div>
                <input type='text'  onChange={(e) => { setLoginInfo({ ...loginInfo, email: e.target.value }) }} name='email' className='admin_input_style_set' placeholder='Email' />
                <input type='password' onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }} name='password' className='admin_input_style_set' placeholder='Enter Your Password' />
                <button  onClick={submitHandeler} className='admin_button_style_set'>LOGIN</button>
            </div>
        </div>
    );
};

export default ClubLogin;