import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import axios from 'axios'
import * as Types from '../../Store/Types'

const CoinToss = () => {
    const [ludo, setLudo] = useState({
        rating: '',
        winningPossibility: '0',
        minimumBetsAmount: '0'
    })
    const dispatch = useDispatch();
    const { coinInfo,flashMessage} = useSelector(state => state.adminCoin, shallowEqual);

    const ludoSethandeler = (e) => {
        setLudo({ ...ludo, [e.target.name]: e.target.value })
    }
    const callMethod = useCallback(() => {
        if (coinInfo)
            setLudo({
                rating: coinInfo.rating,
                winningPossibility: coinInfo.winningPossibility,
                minimumBetsAmount: coinInfo.minimumBetsAmount
            })
    }, [coinInfo])

    useEffect(() => {
        callMethod();
    }, [callMethod])



    const changeHandeler = () => {
        axios.post('/api/admin/games/coin', ludo)
            .then(info => {
                if (info.data) {
                    dispatch({
                        type: Types.ADMIN_COIN_GET, payload: {
                            flashMessage: info.data.flashMessage,
                            coinInfo: info.data.coinrate
                        }
                    })
                }
            })
            .catch(error => {
                if (error.response)
                    dispatch({ type: Types.ADMIN_COIN_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
                else {
                    dispatch({ type: Types.ADMIN_COIN_ERROR, payload: { flashMessage: 'Internal server error' } })
                }
            })
    }



    return (
        <div className='d-flex justify-content-center  w-100'>
            <div className='card card-body m-2 p-1' style={{ maxWidth: '700px', minWidth: '350px' }} >
                {
                    flashMessage ?
                        <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div> : null
                }
                {/* ludo setting  */}
                {
                   
                        <>
                            <div className='p-2 align-left font-weight-bold'>Coin Toss settings:</div>
                            <div className="form-group   m-2">
                                <label className='text-left w-100' htmlFor="amount">Minimum bet amount:</label>
                                <input onChange={ludoSethandeler} value={ludo.minimumBetsAmount} type="text" className="form-control m-1" placeholder="amount" id='amount' name="minimumBetsAmount" />
                            </div>
                            <div className="form-group m-2">
                                <label className='text-left w-100 ' htmlFor="possibility">Rating:</label>
                                <input onChange={ludoSethandeler} value={ludo.rating} type="text" className="form-control m-1" placeholder="Rating" id="rating" name='rating' />
                            </div>
                            <div className="form-group   m-2">
                                <label className='text-left w-100' htmlFor="pos">Admin win possibility <b>({ludo.winningPossibility}%)</b></label>
                                <input onChange={ludoSethandeler} value={ludo.winningPossibility} type="range" max={100} min={0} className="custom-range" id="pos" name="winningPossibility" />
                            </div>
                            <button onClick={changeHandeler} className='btn btn-success w-25'>Save</button>

                        </>
                       
                }
            </div>
        </div>
    );
};

export default CoinToss;