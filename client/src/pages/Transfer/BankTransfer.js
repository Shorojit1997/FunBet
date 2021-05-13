import React, { useState } from 'react';
import axios from 'axios'
import {useSelector,shallowEqual} from 'react-redux'
import {FiRefreshCcw} from 'react-icons/fi'

const BankTransfer = () => {
    const[verifyToken,setVerifyToken]=useState(Math.random().toString(16).substring(7).toUpperCase());
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const RefressHandeler=()=>{
        let r = Math.random().toString(16).substring(7);
        setVerifyToken(r.toUpperCase());
    }
    const [flashMessage, setFlashmessage] = useState('');
    const [accountDetails, setAccountDetails] = useState(
        {
            username: '',
            amount: '',
            counterCode:'',
        })
  
    const accountDetailsHandeler = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
    }

    const submitHandeler=()=>{
        axios.post('/api/user/transfers',accountDetails)
        .then(info=>{
            if(info){
               setFlashmessage(info.data.flashMessage);
               setAccountDetails({
                username: '',
                amount: '',
                counterCode:'',
               })
            }
        })
        .catch(error=>{
            setFlashmessage(error.response.data.flashMessage)
        })
   }

    return (
        <div className='deposit_main' style={{background:colorSettings.userNavBackground }} >
            <div className='deposit_div'>
            {flashMessage && <div className="alert alert-warning  w-100 m-2">{flashMessage} </div>}

                <div className='deposit_header'>Create a transfers request</div>

                <input onChange={accountDetailsHandeler} type='text' className='input_style_set' placeholder='Username' name='username' />

                <div className='input_spiner_set'>
                    <input onChange={accountDetailsHandeler} type='text' className='input_spiner_set_input' value={verifyToken} name='counterCode' />
                    <span className='refress_style' onClick={RefressHandeler} > <FiRefreshCcw/> </span>
                </div>
                
                <input  onChange={accountDetailsHandeler} type='text' className='input_style_set' placeholder='Amount' name='amount' />
                {/* <input type='password' className='input_style_set' placeholder='Enter Your Password' /> */}
                <button onClick={submitHandeler} className='button_style_set' >TRANSFER $</button>

            </div>
        </div>
    );
};

export default BankTransfer;