import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { userCardPlayActionHandeler } from '../../../Store/Actions/GameInfo3Action';
import * as Types from '../../../Store/Types'
import CardPlayModal from './CardPlayModal';
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "Q", "K"]

const Play = () => {
    const [modal, setModal] = useState(false);
    const [isDisable, setisDisable] = useState(false);
    const [info, setInfo] = useState({
        cardCol:'',
        cardValue:'',
        catchAmount: ''
    })
    const {cardRating, flashMessage } = useSelector(state => state.card, shallowEqual);
    const dispatch = useDispatch();

    const playHandeler = () => {
        if (!info.cardCol) {
            return dispatch({
                type: Types.CARD_PLAY_ERROR, payload: {
                    flashMessage: 'Please select card'
                }
            })
        }
      else  if (!info.cardValue) {
            return dispatch({
                type: Types.CARD_PLAY_ERROR, payload: {
                    flashMessage: 'Please select card value'
                }
            })
        }
        else if (!info.catchAmount) {
            return dispatch({
                type: Types.CARD_PLAY_ERROR, payload: {
                    flashMessage: 'Enter stake amount.'
                }
            })
        }
        dispatch({
            type: Types.CARD_PLAY_ERROR, payload: {
                flashMessage: 'Wait...'
            }
        })
        dispatch(userCardPlayActionHandeler(info, setModal,setInfo,setisDisable))
    }

    return (
        <div className='card card-body mt-5' style={{ background: '#ccc' }}>
            {flashMessage ? <div className="alert alert-warning  w-100 m-1">
                {flashMessage}
            </div> : null}
            {
                modal && <CardPlayModal modal={modal} setModal={setModal} />
            }
            <div className='p-2 align-left font-weight-bold'>Select :</div>
            <div className='row'>
                <div className='col-6'>
                    <select onChange={(e)=>{setInfo({...info,cardCol:e.target.value})}} value={info.cardCol}   id='account_name' className='select_style_set' name="method">
                        <option value='' >Select Card</option>
                        <option value='♠️' style={{fontSize:'25px',color:'black'}} >♠️</option>
                        <option value='♣'style={{fontSize:'25px',color:'black'}} >♣</option>
                        <option value='♥'style={{fontSize:'25px',color:'red'}} >♥</option>
                        <option value='♦️' style={{fontSize:'25px',color:'red'}}>♦️</option>
                    </select>

                </div>
                <div className='col-6'>
                <select onChange={(e)=>{setInfo({...info,cardValue:e.target.value})}} id='account_name' value={info.cardValue} className='select_style_set' name="method">
                        <option value='' >Select number</option>
                        {
                            VALUES.map(item=>{
                                return( <option key={parseInt(Math.random()*9999999999999)} value={item} >{item}</option>)
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Amount:</label>
                    <input onChange={(e) => { setInfo({ ...info, catchAmount: e.target.value }) }} value={info.catchAmount} type="text" className="form-control" placeholder=" Amount" id="amount" />
                </div>
                <div className="col-12 form-group">
                    <label className='w-100 text-left' htmlFor="amount">Possibly win <b>({cardRating})</b> : {info.catchAmount * cardRating}</label>
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