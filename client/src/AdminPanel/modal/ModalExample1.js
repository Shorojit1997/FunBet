import React, { useState,useEffect,useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminAccouuntTypeActionHandeler } from '../../Store/Actions/Admin/AdminAccountTypeAction'
import * as Types from '../../Store/Types';

const ModalExample1 = ({ modal, setModal ,info}) => {
    const { flashMessage } = useSelector(state => state.adminAccountType, shallowEqual)
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        accountNumber: '',
        accountName: ''
    })
    const editController = () => {
        const apiUrl = `/api/admin/account_type/edit/${info._id}`
        axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({ accountName: '', accountNumber: '' })
                dispatch(adminAccouuntTypeActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_ACCOUNT_TYPE_ERROR, payload: {
                        flashMessage: e.response.data.flashMessage
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    const callMethod=useCallback(()=>{
        setAccountDetails({accountName:info.accountName,accountNumber:info.accountNumber});
    },[info])
    useEffect(()=>{
        callMethod();
    },[callMethod])
    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit account details</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Account Name:</label>
                        <input onChange={setDeatail} type="text" name='accountName' value={accountDetails.accountName} className="form-control" placeholder="Enter account name" id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="number">Account Number:</label>
                        <input onChange={setDeatail} type="number" name='accountNumber' value={accountDetails.accountNumber} className="form-control" placeholder="Enter account number" id="number" />
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

export default ModalExample1;