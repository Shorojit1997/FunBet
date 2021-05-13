import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminStcknameActionHandeler } from '../../Store/Actions/Admin/AdminStacknameAction'
import * as Types from '../../Store/Types';

const AutoStackEditModal = ({ modal, setModal,name,stackId }) => {
    const { flashMessage } = useSelector(state => state.adminStackName, shallowEqual)
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        name: ''
    })
    const addController = () => {
        const apiUrl=`/api/admin/bets/edit_autostackname/${stackId}`
        axios.post(apiUrl, accountDetails)
            .then(data => {

                setAccountDetails({name: ''})
                dispatch(adminStcknameActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_STACKNAME_ERROR, payload: {
                        flashMessage: e.response.data.flashMessage
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setAccountDetails({name:name})
    }, [name])
    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit gametype</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Game type:</label>
                        <input onChange={setDeatail} type="text" value={accountDetails.name} name='name' className="form-control" placeholder="Enter game type.." id="name" />
                    </div>
                    
                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button onClick={addController} style={{ background: 'white', color: 'black', width: '70%' }} >Submit</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AutoStackEditModal;