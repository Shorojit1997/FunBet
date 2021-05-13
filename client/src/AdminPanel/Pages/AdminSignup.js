import React, { useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminRegisterActionHandeler } from '../../Store/Actions/Admin/AdminRegisterAction'
import AlertMessage from '../../FlashMessage/AlertMessage';


const AdminAuthSignup = () => {
    const dispatch = useDispatch();
    let { error, user } = useSelector(state => state.adminRegister, shallowEqual)

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        activeStatus: ''
    })
    const registerHandeler = () => {
        dispatch(adminRegisterActionHandeler(registerInfo))
        setRegisterInfo({
            name: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            role: '',
            activeStatus: ''
        });
    }

    return (
        <div className='deposit_main d-flex ' style={{ background: "#333" }}>
            <div className='deposit_div'>
                {
                    Object.keys(error).length !== 0 && <AlertMessage error={error} />
                }
                ,{
                    Object.keys(user).length !== 0 && <AlertMessage error={user} />
                }
                <div className='deposit_header'>Create Your Account</div>
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, name: e.target.value }) }} className='input_style_set' placeholder='Name' />
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, phone: e.target.value }) }} className='input_style_set' placeholder='Phone number' />
                <input type='email' onChange={(e) => { setRegisterInfo({ ...registerInfo, email: e.target.value }) }} className='input_style_set' placeholder='Email' />
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, username: e.target.value }) }} className='input_style_set' placeholder='Username' />
                <input type='password' onChange={(e) => { setRegisterInfo({ ...registerInfo, password: e.target.value }) }} className='input_style_set' placeholder='Password' />
                <input type='password' onChange={(e) => { setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value }) }} className='input_style_set' placeholder='Confirmation Password' />

                <select id='club_name' onChange={(e) => { setRegisterInfo({ ...registerInfo, role: e.target.value }) }} value={registerInfo.role} className='select_style_set' name="role">
                   <option value="">Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Super_admin">Super_admin</option>
                </select>
                <select id='club_name' onChange={(e) => { setRegisterInfo({ ...registerInfo, activeStatus: e.target.value }) }} value={registerInfo.activeStatus} className='select_style_set' name="activeStatus">
                  <option value="">Select</option>
                    <option value="Active">Acive</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button onClick={registerHandeler} className='button_style_set'>Submit</button>

            </div>
        </div>
    );
};

export default AdminAuthSignup;