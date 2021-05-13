import React, { useEffect } from 'react';
import '../CoinToss/Wheel.css'
import Play from './Play';
import { adminEvenRatingActionHandeler } from '../../../Store/Actions/GameInfo2Action'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const styles={color:'black',fontSize:'45px',background:"white",fontFamily:'arial'}
const styles1={ minHeight: '400px', margin: '50px', minWidth: '350px', maxWidth: '500px', background: 'none', border: '2px solid yellow' }
const styles2={ background: 'black', color: 'white', marginBottom: '40px', borderRadius: '5px' }

const EvenOdd = () => {
    const dispatch = useDispatch();
    const { tossNumber } = useSelector(state => state.even, shallowEqual);
    useEffect(() => {
        dispatch(adminEvenRatingActionHandeler())
    }, [dispatch])
    return (
        <div className='d-flex justify-content-center'>
            <div className='card card-body' style={styles1}>
                <h1 style={styles2}>Odd-Even</h1>
                <div id="wheelId1">
                    {
                     tossNumber!=='4'?   tossNumber ? JSON.stringify(tossNumber) === '1' ?
                            <h1 style={styles} >ODD</h1> :
                            <h1 style={styles} >EVEN</h1> :
                            <img  className="marker1" alt='marker' src='/images/even_odd1.png' />:
                            <img  className="marker1" alt='marker' src='/images/evenodd.gif' />
                    }

                </div>
                <Play />
            </div>
        </div>
    );
};

export default EvenOdd;