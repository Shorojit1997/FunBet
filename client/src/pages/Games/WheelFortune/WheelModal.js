
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {  useSelector, shallowEqual } from 'react-redux'

const LudoModal = ({ modal, setModal}) => {
    const { wheelStatus } = useSelector(state => state.wheel, shallowEqual)
    return (
        <div >
            <Modal style={{width:'200px',marginLeft:'auto',marginRight:'auto'}} centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}></ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        <div className="alert alert-warning  w-100 m-1">
                            {wheelStatus}
                        </div>
                    }
                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button style={{ background: 'yellow', color: 'black', width: '100%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LudoModal;