import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { gameTypeAction } from '../../../Store/Actions/GameTypeAction'
import { adminBetsActionHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import * as Types from '../../../Store/Types';
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
const format = 'h:mm a';
const now = moment().hour(0).minute(0);



const EditGameModal = (info) => {
    const { matchId, modal, setModal, teamA, teamB, turnamentName, playStatus, gameTypeN, gameTime } = info;
    const { flashMessage } = useSelector(state => state.adminBets, shallowEqual);
    const { gameType } = useSelector(state => state.gameType, shallowEqual);
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        teamA: '',
        teamB: '',
        turnamentName: '',
        playStatus: '',
        gameType: '',
        gameDate: '',
        gameTime: '12:00',
    })
    const editController = () => {
        const apiUrl = `/api/admin/bets/editmatch/${matchId}`
        return axios.post(apiUrl, accountDetails)
            .then(data => {
                setAccountDetails({
                    teamA: '',
                    teamB: '',
                    turnamentName: '',
                    playStatus: '',
                    gameType: '',
                    gameDate: '',
                    gameTime: '12:00',
                })
                dispatch(adminBetsActionHandeler());
                setModal(!modal);
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: e.response.data.flashMessage
                    }
                })
            })
    }
    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }
    const callMethod = useCallback(() => {
        dispatch(gameTypeAction())
        setAccountDetails({
            teamA: teamA,
            teamB: teamB,
            turnamentName: turnamentName,
            playStatus: playStatus,
            gameType: gameTypeN,
            gameTime: gameTime,
        })

    }, [dispatch,teamA,teamB,turnamentName,playStatus,gameTypeN,gameTime])
    useEffect(() => {
        callMethod()
    }, [callMethod]);

    return (
        <>
            <Modal centered={true} isOpen={modal} toggle={() => { setModal(!modal) }} >
                <ModalHeader style={{ background: '#0B4C72', color: 'white' }} toggle={() => { setModal(!modal) }}>Edit match informations</ModalHeader>
                <ModalBody style={{ padding: '10px 15px' }}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name8">Game type:</label>
                        <select onChange={setDeatail} value={accountDetails.gameType} name="gameType" className="form-control" id='name8'>
                            <option value=''>Select</option>
                            {
                                gameType.map((item, index) => {
                                    return (<option key={index} value={item.name}>{item.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name7">Team first:</label>
                        <input onChange={setDeatail} type="text" name='teamA' value={accountDetails.teamA} className="form-control" placeholder="Enter first team name" id="name7" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="number">Team Second:</label>
                        <input onChange={setDeatail} type="text" name='teamB' value={accountDetails.teamB} className="form-control" placeholder="Enter second team name" id="number" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name6">Turnament name:</label>
                        <input onChange={setDeatail} type="text" name='turnamentName' value={accountDetails.turnamentName} className="form-control" placeholder="Enter turnament name" id="name6" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name5">Play Status:</label>
                        <select onChange={setDeatail} value={accountDetails.playStatus} name="playStatus" className="form-control" id='name5'>
                            <option value=''>Select</option>
                            <option value="Hidden">Hidden</option>
                            <option value="Live">Live</option>
                            <option value="Upcomming">Upcomming</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name4">Select Date: </label>
                        <DatePicker
                            className='form-control'
                            selected={accountDetails.gameDate}
                            onChange={date => date && setAccountDetails({ ...accountDetails, gameDate: date })}
                            id='name4'
                            // showTimeSelect
                            dateFormat="Pp"

                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name3">Select Date: </label>
                        <TimePicker
                            showSecond={false}
                            defaultValue={now}
                            className="form-control"
                            onChange={(e) => { e && setAccountDetails({ ...accountDetails, gameTime: e.format(format) }) }}
                            format={format}
                            use12Hours
                            inputReadOnly
                            id='name3'
                        />,
                    </div>

                </ModalBody>

                <ModalFooter style={{ background: '#0B4C72' }}>
                    <Button onClick={editController} style={{ background: 'white', color: 'black', width: '70%' }} >Submit</Button>
                    <Button style={{ background: 'yellow', color: 'black', width: '20%' }} onClick={() => { setModal(!modal) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default EditGameModal;