import React, { useEffect,useCallback } from "react";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import settings from './Settings'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import { sliderSettingsActionHandeler } from '../../Store/Actions/Admin/AdminSettingsAction'

const MultipleItems = () => {
    const dispatch = useDispatch();
    const {sliderImage} =useSelector(state=>state.pictures,shallowEqual);

    const getItems = useCallback(() => {
        dispatch(sliderSettingsActionHandeler())
    },[dispatch])

    useEffect(() => {
        getItems();
        const interval = setInterval(() => {
            getItems()
        }, 60000)
        return () => clearInterval(interval)
    }, [getItems])

    return (
        <div className='carosal_parent' style={{background:'none'}} >
            <div className='carrosal_divv' style={{cursor:'pointer',background:'none',width:'110%'}} >
                <Slider {...settings} >
                    {
                        sliderImage.map((item, index) => {
                            return (
                                <div  key={index} className='game_item'>
                                    <div>
                                        <img  src={item.pictureUrl} alt={item.pictureUrl} />
                                    </div>
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
