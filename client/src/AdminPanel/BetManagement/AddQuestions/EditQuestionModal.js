
import React, { useState,useEffect,useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminBetSingleElementHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import * as Types from '../../../Store/Types';

const EditQuestionModal = ({ modal,questionId,name, setModal,matchId}) => {

    const { flashMessage } = useSelector(state => state.adminBets, shallowEqual)
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        questionName: '',
        questionId:''
    })

    const editController = () => {
        const apiUrl=`/api/admin/bets/editquestion/${matchId}`
        axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({questionName: ''})
                dispatch(adminBetSingleElementHandeler(matchId));
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }

    const callMethod = useCallback(() => {
        setAccountDetails({questionId:questionId,questionName:name})
    }, [name,questionId])

    useEffect(()=>{
        callMethod();
    },[callMethod])

    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit question</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Question Name:</label>
                        <input onChange={setDeatail} type="text" value={accountDetails.questionName} name='questionName' className="form-control" placeholder="Enter question name..." id="name" />
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

export default EditQuestionModal;