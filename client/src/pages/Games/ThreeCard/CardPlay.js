import React, {  useEffect, } from 'react';
import {  userCardRatingActionHandeler } from '../../../Store/Actions/GameInfo3Action'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import './Card.css'
import Play from './Play';
const CardPlay = () => {
    const { computer, yourCard } = useSelector(state => state.card, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userCardRatingActionHandeler())
    }, [dispatch])
    return (
        <div className='d-flex justify-content-center'>
            <div className='card card-body' style={{ minHeight: '300px', margin: '50px', minWidth: '350px', maxWidth: '500px', background: 'none', border: '2px solid yellow' }}>
                <h1 style={{ background: 'black', color: 'white', marginBottom: '40px', borderRadius: '5px' }}>Card</h1>
                <div className='row ' style={{ minHeight: '200px' }}>
                    <div className='col-6  d-flex justify-content-center'>
                        {
                            computer.length===0 ? <div className='empty_deck'></div> :computer
                        }
                    </div>
                    <div className='col-6  d-flex justify-content-center'>
                        {
                            yourCard.length===0  ?<div className='empty_deck'></div> :yourCard
                        }
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-center' style={{ color: 'white', fontSize: '20px', }}>Computer</div>

                    <div className='col-6 d-flex justify-content-center' style={{ color: 'white', fontSize: '20px',  }}>You</div>
                </div>
                <Play/>
            </div>
        </div>
    );
};

export default CardPlay;
