
import React, { useState, useEffect,useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminStckActionHandeler } from '../../../Store/Actions/Admin/AdminAutostackAction'
import * as Types from '../../../Store/Types';

const EditOptionModal = ({ modal, setModal, optionId, questionId, gameId, rating, option }) => {

    const { flashMessage } = useSelector(state => state.adminStack, shallowEqual)
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        rating: '',
        option: '',
        optionId: ''
    })

    const addController = () => {
        const apiUrl = `/api/admin/bets/editoption_autostack/${questionId}`
        axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({ rating: '', option: '' })
                dispatch(adminStckActionHandeler({ questionId: gameId }));
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_STACK_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    const callMethod = useCallback(() => {
        setAccountDetails({ option: option, rating: rating, optionId: optionId });
    }, [option, rating, optionId])

    useEffect(() => {
        callMethod();
    }, [callMethod])
    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Add</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Option Name:</label>
                        <input onChange={setDeatail} type="text" value={accountDetails.option} name='option' className="form-control" placeholder="Enter question name..." id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Rating:</label>
                        <input onChange={setDeatail} type="text" value={accountDetails.rating} name='rating' className="form-control" placeholder="Enter rating" id="name" />
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

export default EditOptionModal;