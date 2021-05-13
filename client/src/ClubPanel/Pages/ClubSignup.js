import React, { useState } from 'react';
import axios from 'axios'


const ClubSignup = () => {
    const [flashMessage, setFlashmessage] = useState('')
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        phone: '',
        email: '',
        clubName: '',
        password: '',
        confirmPassword: '',
    })
    const registerHandeler = () => {
        axios.post('/api/club/signup',registerInfo)
        .then(info=>{
            setFlashmessage('Successfully created your account.')
            setRegisterInfo({
                name: '',
                phone: '',
                email: '',
                clubName: '',
                password: '',
                confirmPassword: '',
            });
        })
        .catch(e=>{
            if(e.response){
                setFlashmessage(e.response.data.flashMessage)
            }
            else{
                setFlashmessage('Internal server error')
            }
        })
      
    }

    return (
        <div className='deposit_main d-flex ' style={{background:'none'}} >
            <div className='deposit_div'>
                {
                    flashMessage &&
                    <div className="alert alert-warning  w-100 m-1">
                        {flashMessage}
                    </div>
                }
                <div className='deposit_header'>Club Admin</div>
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, name: e.target.value }) }} className='input_style_set' placeholder='Name' />
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, phone: e.target.value }) }} className='input_style_set' placeholder='Phone number' />
                <input type='email' onChange={(e) => { setRegisterInfo({ ...registerInfo, email: e.target.value }) }} className='input_style_set' placeholder='Email' />
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, clubName: e.target.value }) }} className='input_style_set' placeholder='Clubname' />
                <input type='password' onChange={(e) => { setRegisterInfo({ ...registerInfo, password: e.target.value }) }} className='input_style_set' placeholder='Password' />
                <input type='password' onChange={(e) => { setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value }) }} className='input_style_set' placeholder='Confirmation Password' />
                <button onClick={registerHandeler} className='button_style_set'>Submit</button>

            </div>
        </div>
    );
};

export default ClubSignup;