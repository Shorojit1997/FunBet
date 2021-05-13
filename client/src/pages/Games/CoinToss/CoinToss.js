import React, { useEffect } from 'react';
import './Wheel.css'
import Play from './Play';
import { admincoinRatingActionHandeler } from '../../../Store/Actions/GameInfo1Action'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'



const CoinToss = () => {
    const dispatch = useDispatch();
    const { tossNumber } = useSelector(state => state.coin, shallowEqual);
    useEffect(() => {
        dispatch(admincoinRatingActionHandeler())
    }, [dispatch])
    return (
        <div className='d-flex justify-content-center'>
            <div className='card card-body' style={{ minHeight: '400px', margin: '50px', minWidth: '350px', maxWidth: '500px', background: 'none', border: '2px solid yellow' }}>
                <h1 style={{ background: 'black', color: 'white', marginBottom: '40px', borderRadius: '5px' }}>Coin toss</h1>
                <div id="wheelId1">
                    {
                     tossNumber!=='4'? tossNumber ? JSON.stringify(tossNumber) === '1' ?
                            <img className="marker1" style={{width:'200px',height:'200px'}} alt='haed1' src='/images/head.png' /> :
                            <img className="marker1" style={{width:'200px',height:'200px'}} alt='tail' src='/images/tail.png' /> :
                            <img className="marker1" alt='marker' src='/images/headOrTail_one.png' />:
                            <img className="marker1" style={{width:'200px',height:'200px'}} alt='marker' src='/images/head_or_tail.gif' />
                    }

                </div>
                <Play />
            </div>
        </div>
    );
};

export default CoinToss;