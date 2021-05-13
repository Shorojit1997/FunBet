import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminPromocodeActionHandeler } from '../../Store/Actions/Admin/AdminPromocodeAction'
import * as Types from '../../Store/Types';

const AddPromocodeModal = ({ modal, setModal}) => {
    const { flashMessage } = useSelector(state => state.promocode, shallowEqual)
    const dispatch = useDispatch();
    const [promocode, setPromocode] = useState('')

    const addController = () => {
        const apiUrl=`/api/admin/security`
        axios.post(apiUrl, {promocode})
            .then(data => {
                setPromocode('')
                dispatch(adminPromocodeActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_PROMOCODE_ERROR, payload: {
                        flashMessage: 'Please try again...'
                    }
                })
            })
    }


    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Add security code</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Add new code:</label>
                        <input onChange={(e)=>{setPromocode(e.target.value)}} type="text" value={promocode} name='name' className="form-control" placeholder="Enter code.." id="name" />
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

export default AddPromocodeModal;