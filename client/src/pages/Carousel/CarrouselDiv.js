import React, { useState } from 'react';

import pic from '../../pictures/splash_icon.png'

const CarrouselDiv = () => {
    const [itemnumber, setItemnumber] = useState(1);
    const items = [
        {
            id: 1,
            picurl: pic,
            tagname: 'Basketball'
        },
        {
            id: 2,
            picurl: pic,
            tagname: 'Football'
        },
        {
            id: 3,
            picurl: pic,
            tagname: "Cricket"
        },
        {
            id: 4,
            picurl: pic,
            tagname: 'voliball'
        },
        {
            id: 5,
            picurl: pic,
            tagname: 'kickball'
        },
        {
            id: 6,
            picurl: pic,
            tagname: 'petball'
        },
        {
            id: 7,
            picurl: pic,
            tagname: 'noting ball'
        },
    ]
    const plusHandeler = () => {
        if (items.length > itemnumber + 4)
            setItemnumber(prev => prev + 1);
    }

    const minusHandeler = () => {
        if (itemnumber > 1)
            setItemnumber(prev => prev - 1);
    }
    return (
        <div className='carrosel_div'>
            <div onClick={plusHandeler} className='carrosel_before' />
            <div onClick={minusHandeler} className='carrosel_after' />

            {
                items.map(item => {
                    if(itemnumber+4>item.id && itemnumber <=item.id)
                    return (
                        <div key={item.id} className='carrosel_item'>
                            <img src={item.picurl} />
                            <p> {item.tagname}</p>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default CarrouselDiv;