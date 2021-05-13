import React, { useEffect,useCallback } from "react";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from './Settings'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import * as Types from '../../Store/Types'
import { gameTypeAction } from '../../Store/Actions/GameTypeAction'

const MultipleItems = () => {
    const dispatch = useDispatch();
    const {gameType} =useSelector(state=>state.gameType,shallowEqual);

    const gameTypeSetHandeler = (type) => {
        dispatch({ type: Types.GAME_TYPE, payload: { gameType: type } })
    }
    const getItems = useCallback(() => {
        dispatch(gameTypeAction())
    },[dispatch])

    useEffect(() => {
        getItems();
        const interval = setInterval(() => {
            getItems()
        }, 60000)
        return () => clearInterval(interval)
    }, [getItems])

    return (
        <div className='carosal_parent' style={{margin:'0px'}}>
            <div className='carrosal_divv' style={{cursor:'pointer'}} >
                <Slider {...settings} >
                    {
                        gameType.map((item, index) => {
                            return (
                                <div onClick={() => { gameTypeSetHandeler(item.name) }} key={index} className='carrosel_item'>
                                    <div>
                                        <img src={item.picsUrl} alt={item.name} />
                                    </div>
                                    <p> {item.name}</p>
                                </div>
                            )
                        })
                        
                    }

                </Slider>
            </div>
        </div>
    );
};

export default MultipleItems;
