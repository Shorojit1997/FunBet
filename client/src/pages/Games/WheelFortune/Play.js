import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { userWheelPlayActionHandeler } from '../../../Store/Actions/GameInfoAction';
import * as Types from '../../../Store/Types'
import WheelModal from './WheelModal';

const Play = () => {
    const [modal, setModal] = useState(false);
    const [isDisable, setisDisable] = useState(false);
    const [info, setInfo] = useState({
        tossNum: '',
        catchAmount: ''
    })
    const { wheelRating, flashMessage } = useSelector(state => state.wheel, shallowEqual);
    const dispatch = useDispatch();

    const playHandeler = () => {
       
        if (!info.tossNum) {
            return dispatch({
                type: Types.WHEEL_PLAY_ERROR, payload: {
                    flashMessage: 'Please select the color'
                }
            })
        }
        else if (!info.catchAmount) {
            return dispatch({
                type: Types.WHEEL_PLAY_ERROR, payload: {
                    flashMessage: 'Enter stake amount.'
                }
            })
        }
        dispatch({
            type: Types.WHEEL_PLAY_ERROR, payload: {
                flashMessage: 'Wait...'
            }
        })
        dispatch(userWheelPlayActionHandeler({info,setModal,setInfo,setisDisable}))
    }

    return (
        <div className='card card-body mt-5' style={{ background: '#ccc' }}>
            {flashMessage ? <div className="alert alert-warning  w-100 m-1">
                {flashMessage}
            </div> : null}
            {
                modal && <WheelModal modal={modal} setModal={setModal} />
            }
            <div className='p-2 align-left font-weight-bold'>Select color:</div>
            <div className='row'>
                <div onClick={() => { setInfo({ ...info, tossNum: '1' }) }} className='col-4'>
                    {
                        info.tossNum === '1' ? <button className={"btn btn-danger w-100 m-1"} type="button">Selected</button> :
                            <img src='/images/11.jpg' alt='one' style={{ border: '1px solid gray', borderRadius: '5px', width: '100%', height: '35px', margin: '5px' }} />
                    }

                </div>
                <div onClick={() => { setInfo({ ...info, tossNum: '2' }) }} className='col-4'>
                    {
                        info.tossNum === '2' ? <button className={"btn btn-danger w-100 m-1"} type="button">Selected</button> :
                            <img src='/images/22.jpg' alt='two' style={{ border: '1px solid gray', borderRadius: '5px', width: '100%', height: '35px', margin: '5px' }} />
                    }

                </div>
                <div onClick={() => { setInfo({ ...info, tossNum: '3' }) }} className='col-4'>
                    {
                        info.tossNum === '3' ? <button className={"btn btn-danger w-100 m-1"} type="button">Selected</button> :
                            <img src='/images/33.jpg' alt='three' style={{ border: '1px solid gray', borderRadius: '5px', width: '100%', height: '35px', margin: '5px' }} />
                    }

                </div>
                <div onClick={() => { setInfo({ ...info, tossNum: '4' }) }} className='col-4'>
                    {
                        info.tossNum === '4' ? <button className={"btn btn-danger w-100 m-1"} type="button">Selected</button> :
                            <img src='/images/44.jpg' alt='three' style={{ border: '1px solid gray', borderRadius: '5px', width: '100%', height: '35px', margin: '5px' }} />
                    }

                </div>

            </div>
            <div className='row'>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Amount:</label>
                    <input onChange={(e) => { setInfo({ ...info, catchAmount: e.target.value }) }} value={info.catchAmount} type="text" className="form-control" placeholder=" Amount" id="amount" />
                </div>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Possibly win <b>({wheelRating})</b> : {info.catchAmount * wheelRating}</label>
                </div>

                <div className="col-12 form-group">
                    {/* <img onClick={playHandeler}  src='/images/button.png' alt='play' style={{width:'200px' ,height:'35px'}} /> */}
                    {
                        isDisable ?
                         <button disabled onClick={playHandeler} className='btn btn-success w-50' >Play</button> :
                            <button onClick={playHandeler} className='btn btn-success w-50' >Play</button>
                    }
                </div>

            </div>

        </div>
    );
};

export default Play;