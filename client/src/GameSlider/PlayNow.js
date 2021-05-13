import React from "react";



const GameSlider = () => {

    return (
        <div className='card bg-dark p-0'>

            <div className='card-body bg-light p-0 m-0'>
                <div className='row m-1 p-0'>
                    <div className='col-12 col-lg-6 col-md-6 mb-1 p-0' >
                        <div className=' play_slider'>
                            <img  src='/images/card_one.png' alt='head' />
                        </div>
                        <button onClick={() => window.open("/games/card", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>

                    <div className='col-12 col-lg-6 col-md-6 mb-1 p-0' >
                        <div className='play_slider '>
                            <img src='/images/wheel1_one.png' alt='wheel' />
                        </div>
                        <button onClick={() => window.open("/games/wheel", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className='col-12 col-lg-6 col-md-6 mb-1 p-0' >
                        <div className=' play_slider'>
                            <img  src='/images/even_odd_one.png' alt='' />
                        </div>
                        <button onClick={() => window.open("/games/even_odd", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className='col-12 col-lg-6 col-md-6 mb-1 p-0' >
                        <div className=' play_slider'>
                            <img  src='/images/ludo_one.png' alt='ludo' />
                        </div>
                        <button onClick={() => window.open("/games/ludo", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                    <div className='col-12 col-lg-6 col-md-6 mb-1 p-0' >
                        <div className=' play_slider'>
                            <img  src='/images/headOrTail_one.png' alt='head' />
                        </div>
                        <button onClick={() => window.open("/games/coin_toss", "_blank")} className='slider_bttn ' > PLAY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSlider;
