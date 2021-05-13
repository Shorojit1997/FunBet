import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'



import AlertMessage from '../../../FlashMessage/AlertMessage';
import { loginActionHandeler } from '../../../Store/Actions/LoginAction'

const AuthLogin = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const loginError =useSelector(state=>state.login.loginError)
    // const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        promocode:''
    })

    const submitHandeler = (e) => {
         dispatch(loginActionHandeler(loginInfo,history))
    }
   
    return (
     
        <div className='deposit_main' style={{background:'none',marginTop:'60px' }}>
            <div className='deposit_div'>
                {
                   Object.keys(loginError).length!==0 &&  <AlertMessage error={loginError} /> 
                }
                <div className='deposit_header'>Please login</div>
                <input type='text' onChange={(e) => { setLoginInfo({ ...loginInfo, email: e.target.value }) }} value={loginInfo.email} name='email' className='input_style_set' placeholder='Email...' />
                <input type='password' onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }} value={loginInfo.password} name='password' className='input_style_set' placeholder='Enter Your Password' />
                <input type='text' onChange={(e) => { setLoginInfo({ ...loginInfo, promocode: e.target.value }) }} value={loginInfo.promocode} name='promocode' className='input_style_set' placeholder='Security code' />
                <div className='checkbox_input_rem'>
                    <input className='chek_box' onChange={(e) => { setLoginInfo({ ...loginInfo, rememberme: e.target.value }) }} type="checkbox" id="remember" name="rememberme" />
                    <label htmlFor="remember"> Remember me</label>
                </div>
                <button onClick={submitHandeler} className='button_style_set'>LOGIN ACCOUNT</button>

                <h5 className='have_account'>Don't have an account?</h5>
                <button onClick={() => { history.push('/signup') }} className='button_style_set'>CREATE A NEW ACCOUNT</button>

            </div>
        </div>
       
    );
};

export default (AuthLogin);