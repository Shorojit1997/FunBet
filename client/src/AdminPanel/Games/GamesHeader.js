import React from 'react';
import {IoMdAddCircleOutline} from 'react-icons/io'

const GamesHeader = ({headerTitle}) => {
    return (
        <div className='row my-auto '>
        <div className='col-6 text-left '><h5>{headerTitle}</h5> </div>
        <div className='col-6 text-right'>
            <button className="btn btn-success set_width" ><IoMdAddCircleOutline/> Add</button>
        </div>
    </div>
    );
};

export default GamesHeader;