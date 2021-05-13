import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPiker = ({colorTitle,colorToogleHandeler,colorPicker,setColorPicker}) => {
    return (
        <div className='col-12 col-lg-6 col-md-6'>
        <div className='row m-3 text-left border p-2'>
            <div style={{ fontSize: '18px',fontFamily:'Cambria' }} className='col-10 col-lg-10'>{colorTitle} :</div>
            <div onClick={() => { colorToogleHandeler(1) }} style={{background:userBackground}} className='col-1 col-lg-1 btn w-100 border'> </div>
            <div className='position-absolute top-0 right-align'>
                {
                    colorToogle === 1 && <SketchPicker
                        color={userBackground}
                        onChange={(color) => { setColorPicker({ ...colorPicker, userBackground: color.hex }) }}
                    />
                }
            </div>
        </div>
    </div>
    );
};

export default ColorPiker;