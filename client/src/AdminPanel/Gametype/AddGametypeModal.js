import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { gameTypeAction } from '../../Store/Actions/GameTypeAction';

const AddPromocodeModal = ({ modal, setModal}) => {
   const[flashMessage,setFlashmessage]=useState('')
    const dispatch = useDispatch();
    const [promocode, setPromocode] = useState('')

    const addController = () => {
        const apiUrl=`/api/admin/games/game_type`
        axios.post(apiUrl, {name:promocode})
            .then(data => {
                setPromocode('')
                dispatch(gameTypeAction());
                setModal(!modal);
            })
            .catch(e => {
                if(e.response){
                    setFlashmessage(e.response.flashMessage)
                }
            })
    }


    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Add Gametype</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Gamename</label>
                        <input onChange={(e)=>{setPromocode(e.target.value)}} type="text" value={promocode} name='name' className="form-control" placeholder="Enter gametype" id="name" />
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