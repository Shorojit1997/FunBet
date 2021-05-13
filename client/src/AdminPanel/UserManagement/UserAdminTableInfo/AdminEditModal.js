import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminDetailsActionHandeler } from '../../../Store/Actions/Admin/AdminListAction'
import * as Types from '../../../Store/Types';

const AdminEditModal = (info) => {
    const { flashMessage } = useSelector(state => state.adminList, shallowEqual);
    const { modal, setModal, name, phone, username, email, adminId } = info;
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        oldPassword: ''
    })
    const editController = () => {
        const apiUrl = `/api/admin//edit_admin/${adminId}`
        axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({
                    name: '',
                    phone: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    oldPassword: ''
                })
                dispatch(adminDetailsActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_LIST_ERROR, payload: {
                        flashMessage: e.response.data.flashMessage
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    const callMethod = useCallback(() => {
        setAccountDetails({
            name: name,
            phone: phone,
            email: email,
            username: username
        });
    }, [name, phone, email, username])

    useEffect(() => {
        callMethod();
    }, [callMethod])
    return (
        <>
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit admin details</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }

                    <div className='form-group'>
                        <label htmlFor="name">Unserame:</label>
                        <input onChange={setDeatail} type="text" disabled name='username' value={accountDetails.username} className="form-control" placeholder="Enter account name" id="name" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="number">Name:</label>
                        <input onChange={setDeatail} type="text" name='name' value={accountDetails.name} className="form-control" placeholder="Enter account number" id="number" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Email:</label>
                        <input onChange={setDeatail} type="text" disabled name='email' value={accountDetails.email} className="form-control" placeholder="Enter account name" id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Phone:</label>
                        <input onChange={setDeatail} type="text" disabled name='phone' value={accountDetails.phone} className="form-control" placeholder="Enter account name" id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Old password:</label>
                        <input onChange={setDeatail} type="password" name='oldPassword' value={accountDetails.oldPassword} className="form-control" placeholder="Old password" id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">New password:</label>
                        <input onChange={setDeatail} type="password" name='password' value={accountDetails.password} className="form-control" placeholder="New password" id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">New confirm password:</label>
                        <input onChange={setDeatail} type="password" name='confirmPassword' value={accountDetails.confirmPassword} className="form-control" placeholder="New confirmpassword " id="name" />
                    </div>

                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button onClick={editController} style={{ background: 'white', color: 'black', width: '70%' }} >Submit</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AdminEditModal;