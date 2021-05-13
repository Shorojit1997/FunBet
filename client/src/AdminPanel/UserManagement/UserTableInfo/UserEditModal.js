import React, { useState, useEffect,useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminUserDetailsActionHandeler } from '../../../Store/Actions/Admin/AdminUserListAction'
import * as Types from '../../../Store/Types';

const UserEditModal = (info) => {
    const { flashMessage } = useSelector(state => state.userList, shallowEqual);
    const { modal, setModal, name, phone, username, email, userId, clubName, sponsorName } = info;
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        clubName: '',
        sponsorName: ''
    })
    const editController = () => {
        const apiUrl = `/api/admin/edit_user/${userId}`
        axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({
                    name: '',
                    phone: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    clubName: '',
                    sponsorName: ''
                })
                dispatch(adminUserDetailsActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.USER_LIST_ERROR, payload: {
                        flashMessage: e.response.data.flashMessage
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }

    const callMethod=useCallback(()=>{
        setAccountDetails({
            name: name,
            phone: phone,
            email: email,
            username: username,
            clubName: clubName,
            sponsorName: sponsorName
        });
    },[name,phone,email,username,clubName,sponsorName])

    useEffect(() => {
        callMethod();
    }, [callMethod])
    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit admin details</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }

                    <div className='form-group'>
                        <label htmlFor="name1">Unserame:</label>
                        <input onChange={setDeatail} type="text" disabled name='username' value={accountDetails.username} className="form-control" placeholder="Enter account name" id="name1" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name2">Name:</label>
                        <input onChange={setDeatail} type="text" name='name2' value={accountDetails.name} className="form-control" placeholder="Enter account number" id="number" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name3">Email:</label>
                        <input onChange={setDeatail} type="text" disabled name='email' value={accountDetails.email} className="form-control" placeholder="Enter account name" id="name3" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name4">Phone:</label>
                        <input onChange={setDeatail} type="text" disabled name='phone' value={accountDetails.phone} className="form-control" placeholder="Enter account name" id="name4" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name5">Change password(Optional):</label>
                        <input onChange={setDeatail} type="password" name='password' value={accountDetails.password} className="form-control" placeholder="New password" id="name5" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name6">Change confirm password(Optional):</label>
                        <input onChange={setDeatail} type="password" name='confirmPassword' value={accountDetails.confirmPassword} className="form-control" placeholder="New confirmpassword " id="name6" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name7">Club Name:</label>
                        <select  onChange={setDeatail} value={accountDetails.clubName} className='form-control' id='name7' name="clubName">
                            <option value="">Select</option>
                            <option value="green">Green Club</option>
                            <option value="yellow">Yellow Club</option>
                            <option value="hm">HM Club</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name8">Sponsor Name:</label>
                        <input type='text' onChange={setDeatail} value={accountDetails.sponsorName} name='sponsorName' className="form-control" id='name8' placeholder='Enter sponsor username' />
                    </div>

                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button onClick={editController} style={{ background: 'white', color: 'black', width: '70%' }} >Submit</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UserEditModal;