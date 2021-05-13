import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { userEvenPlayActionHandeler } from '../../../Store/Actions/GameInfo2Action';
import * as Types from '../../../Store/Types'
import LudoModal from './EvenOddModal';

const Play = () => {
    const [modal, setModal] = useState(false);
    const [isDisable, setisDisable] = useState(false);
    const [info, setInfo] = useState({
        tossNum: '',
        catchAmount: ''
    })
    const { evenOddRating, flashMessage } = useSelector(state => state.even, shallowEqual);
    const dispatch = useDispatch();

    const playHandeler = () => {
        if (!info.tossNum) {
            return dispatch({
                type: Types.EVEN_PLAY_ERROR, payload: {
                    flashMessage: 'Please select the point'
                }
            })
        }
        else if (!info.catchAmount) {
            return dispatch({
                type: Types.EVEN_PLAY_ERROR, payload: {
                    flashMessage: 'Enter stake amount.'
                }
            })
        }
        dispatch({
            type: Types.EVEN_PLAY_ERROR, payload: {
                flashMessage: 'Wait...'
            }
        })
        dispatch(userEvenPlayActionHandeler({ info, setModal, setInfo,setisDisable }))

    }

    return (
        <div className='card card-body mt-5' style={{ background: '#ccc' }}>
            {flashMessage ? <div className="alert alert-warning  w-100 m-1">
                {flashMessage}
            </div> : null}
            {
                modal && <LudoModal modal={modal} setModal={setModal} />
            }
            <div className='p-2 align-left font-weight-bold'>Select number:</div>
            <div className='row'>
                <div className='col-6'>
                    <button onClick={() => { setInfo({ ...info, tossNum: '1' }) }} className={info.tossNum === '1' ? "btn btn-danger w-100 m-1" : "btn btn-warning w-100 m-1"} type="button">ODD</button>
                </div>
                <div className='col-6'>
                    <button onClick={() => { setInfo({ ...info, tossNum: '2' }) }} className={info.tossNum === '2' ? "btn btn-danger w-100 m-1" : "btn btn-warning w-100 m-1"} type="button" >EVEN</button>
                </div>
            </div>
            <div className='row'>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Amount:</label>
                    <input onChange={(e) => { setInfo({ ...info, catchAmount: e.target.value }) }} value={info.catchAmount} type="text" className="form-control" placeholder=" Amount" id="amount" />
                </div>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Possibly win <b>({evenOddRating})</b> : {info.catchAmount * evenOddRating}</label>
                </div>

                <div className="col-12 form-group">
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