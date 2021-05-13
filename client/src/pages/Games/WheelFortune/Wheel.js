import React, {useEffect } from 'react';
import './Wheel.css'
import Play from './Play'; 
import{ adminWheelRatingActionHandeler} from '../../../Store/Actions/GameInfoAction'
import{useDispatch,useSelector,shallowEqual} from 'react-redux'



const Wheel = () => {
    const dispatch = useDispatch();
    const {fortuneDegree}=useSelector(state=>state.wheel,shallowEqual);
    useEffect(() => {
        dispatch(adminWheelRatingActionHandeler())
    }, [dispatch])
    return (
        <div className='d-flex justify-content-center'>
            <div className='card card-body' style={{ minHeight: '400px', margin: '50px', minWidth: '350px', maxWidth: '500px', background: 'none', border: '2px solid yellow' }}>
                <h1 style={{ background: 'black', color: 'white', marginBottom: '40px', borderRadius: '5px' }}>Fortune Wheel</h1>
                <div id="wheelId">
                    <img className="marker" alt='marker' src='/images/marker.png' />
                    <img className="wheel" alt='markar' src='/images/wheel.png' style={{ WebkitTransform: `rotate(${fortuneDegree+22}deg)` }} />
                </div>
                <Play/>
            </div>
        </div>
    );
};

export default Wheel;