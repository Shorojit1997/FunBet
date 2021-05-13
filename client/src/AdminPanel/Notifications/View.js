
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const View = ({ modal, setModal,title,description }) => {

    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}> Notification</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    <div className='form-group'>
                        <label htmlFor="name">Title :</label>
                        <input  type="text" value={title} name='title' className="form-control" placeholder="Title..." id="name" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name1">Description:</label>
                        <textarea  value={description} name='description' className="form-control" style= {{minHeight:"200px"}} placeholder="Descriptions..." id="name1" />
                    </div>

                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default View;