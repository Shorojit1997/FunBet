import React from "react";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from './Settings';
import {useHistory} from 'react-router-dom'
import { animateScroll } from 'react-scroll'

const GameSlider = () => {
    const history=useHistory();

    return (
        <div className='card bg-dark p-0'>
            <div onClick={()=>{history.push('/games/play');animateScroll.scrollTo(600)}}  className='card-header bg-light pointer-event' >Play Now</div>
            <div className='card-body bg-light p-0 m-0'>
                <Slider {...settings} >
                    <div className=' play_slider'>
                        <div>
                            <img className='blinking_frame' src='/images/card_one.png' alt='head' />
                        </div>
                        <button onClick={() => window.open("/games/card", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>

                    <div onClick={() => { }} className=' play_slider'>
                        <div>
                            <img className='blinking_frame' src='/images/wheel1_one.png' alt='wheel' />
                        </div>
                        <button onClick={() => window.open("/games/wheel", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className=' play_slider'>
                        <div>
                            <img className='blinking_frame' src='/images/even_odd_one.png' alt='' />
                        </div>
                        <button onClick={() => window.open("/games/even_odd", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className=' play_slider'>
                        <div>
                            <img className='blinking_frame' src='/images/ludo_one.png' alt='ludo' />
                        </div>
                        <button onClick={() => window.open("/games/ludo", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className=' play_slider'>
                        <div>
                            <img className='blinking_frame' src='/images/headOrTail_one.png' alt='head' />
                        </div>
                        <button onClick={() => window.open("/games/coin_toss", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>


                </Slider>

            </div>
        </div>
    );
};

export default GameSlider;
