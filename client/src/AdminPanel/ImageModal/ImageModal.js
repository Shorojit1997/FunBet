
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const AutoOptionModal = ({ modal, setModal,pictures,flashMessage,setImageHandeler,headerTitle }) => {
    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>{headerTitle}</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='row p-1 m-1'>
                     {
                        pictures &&
                        pictures.map((item, index) => {
                            return (
                                <div key={index + 1} className='col-4 m-0 p-0 border'>
                                    <button
                                        onClick={() => { setImageHandeler(item._id) }}
                                        style={{ bottom: '5px', right: '5px' }}
                                        className='btn btn-sm btn-success position-absolute'>Save</button>
                                    <img src={item.pictureUrl} style={{ width: '90%', margin: '5px' }} alt={item.createdAt} />
                                </div>
                            )
                        })
                    }
                    </div>

                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button  style={{ background: 'white', color: 'black', width: '70%' }} >Submit</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AutoOptionModal;