import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Alert } from 'reactstrap';
import axios from 'axios'

// picture link

// css link


const ModalExample = (info) => {
    const {
        matchId,
        questionId,
        questionName,
        setModalId,
        option,
        modal,
        setModal,
        className,
        matchInfo,
        pics
    } = info
    const [betInfo, setBetInfo] = useState({
        matchId: matchId,
        questionId: questionId,
        optionId: option._id,
        amount: '100'

    })
    const [flashMessage, setFlashMessage] = useState('');

    const betSetHandeler = () => {
        axios.post('/api/user/place_bets', betInfo)
            .then(info => {
                setFlashMessage(info.data.flashMessage)
            })
            .catch(error => {
                setFlashMessage(error.response.data.flashMessage)
            })

    }

    return (
        <div >
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} className={className} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Place Bet</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage &&
                        <Alert color="success">{flashMessage}</Alert>
                    }
                    {/* match header  */}
                    <div className='question_header'>
                        <img src={pics} alt='playpicture' />
                        <p style={{ fontSize: '14px' }}>{matchInfo.name}</p>
                    </div>
                    <div className='modalquestion_div'>Qs. {questionName}</div>
                    <div style={{ borderRadius: '5px', marginBottom: '5px', height: '30px' }} className='question_option_one'>
                        <h5 >{option.option} </h5>
                        <p>{option.rating} </p>
                    </div>
                    <div className='modal_input_amount'>
                        <input onChange={(e) => { setBetInfo({ ...betInfo, amount: e.target.value }) }} type='number' placeholder='Enter your amount' value={betInfo.amount} />
                    </div>
                    <div className='modal_wining_amount'>
                        <div className='modal_risk'>Total Stake : <p> {betInfo.amount} BDT</p> </div>
                        <div className='modal_risk'>Possibly Wining : <p style={{ color: 'rgb(84, 235, 54)' }}> {parseFloat(betInfo.amount) * parseFloat(option.rating)} BDT</p> </div>
                    </div>
                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button onClick={betSetHandeler} style={{ background: 'white', color: 'black', width: '70%' }} >Place Bet</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal); setModalId('') }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;