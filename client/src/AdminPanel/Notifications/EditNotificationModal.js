
import React, { useState,useEffect,useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { adminNotificationsAction } from '../../Store/Actions/Admin/AdminNotificationAction';
import { useDispatch } from 'react-redux';

const EditNotificationModal = ({ modal, setModal,title,description,_id }) => {
    const[flashMessage,setFlashmessage]=useState('');
    const dispatch = useDispatch();

    const [accountDetails, setAccountDetails] = useState({
        title: '',
        description: ''
    })

    const addController = () => {
        const apiUrl = `/api/admin/notifications/${_id}`
        axios.put(apiUrl, accountDetails)
            .then(data => {
                dispatch(adminNotificationsAction())
                setAccountDetails({
                    title: '',
                    description: ''
                })
                setModal(!modal);
            })
            .catch(e => {
                if(e.response){
                    setFlashmessage(e.response.data.flashMessage)
                }
                else{
                    setFlashmessage('Internal server error.')
                }
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    const setPost=useCallback(()=>{
        setAccountDetails({title:title,description:description})
    },[title,description,setAccountDetails])
    useEffect(()=>{
        setPost();
    },[setPost])

    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}> Notification</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Title :</label>
                        <input onChange={setDeatail} type="text" value={accountDetails.title} name='title' className="form-control" placeholder="Title..." id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name1">Description:</label>
                        <textarea  onChange={setDeatail}  value={accountDetails.description} name='description' className="form-control" style= {{minHeight:"200px"}} placeholder="Descriptions..." id="name1" />
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

export default EditNotificationModal;