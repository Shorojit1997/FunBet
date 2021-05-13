import React, { useState,useEffect,useCallback } from 'react';
import { SketchPicker } from 'react-color';
import {adminColorSettingsActionHandeler} from '../../Store/Actions/Admin/AdminSettingsAction'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'

const ColorSettings = () => {
    const [colorToogle, setColorToogle] = useState(false)
    const [colorCode, setColorcode] = useState('')
    const [copy, setCopy] = useState('');
    const dispatch = useDispatch();
    const {colorSettings}=useSelector(state=>state.settings,shallowEqual)

    let [colorPicker, setColorPicker] = useState(
        {
            userBackground: '',
            userNavBackground: '',
            userNavTextColor: '',
            userNavTextActiveColor: '',
            userFooterBackground: '',
            userFooterTextColor: '',
            userFooterFontsize: '',
            userButtonColor: '',
            userButtonFontSize: '',
            adminBackground: '',
            adminNavBackground: '',
            adminNavTextColor: '',
            adminNavTextActiveColor: '',
            adminFooterBackground: '',
            adminFooterTextColor: '',
            adminFooterFontsize: '',
            adminButtonColor: '',
            adminButtonFontSize: ''
        })

    const colorSetHandeler = (str) => {
        setColorPicker({ ...colorPicker, [str]: copy })
    }
    const onChangeHandeler = (e) => {
        setColorPicker({ ...colorPicker, [e.target.name]: e.target.value })
    }
    const callMethod=useCallback(()=>{
        setColorPicker(colorSettings)
    },[colorSettings])

    useEffect(() => {
        callMethod()
    }, [callMethod])

    const sumitHandeler=()=>{
        dispatch(adminColorSettingsActionHandeler(colorPicker))
    }


    return (

        <div className='card card-body w-100' style={{ margin: '0px', padding: '0px' }}>

            <div className='d-flex flex-column  align-items-center w-100 m-0 p-0'>
                <div className='p-2 align-left font-weight-bold'>Color code generator:</div>
                <div className='row border-1 bg-dark p-1 w-100' style={{ maxWidth: '700px' }} >
                    <button onClick={() => setColorToogle(!colorToogle)} className='col-4 border-0' style={{ backgroundColor: colorCode }}>
                        Select
                  </button>
                    <div className='col-5'>
                        <input onChange={(e)=>{setColorcode(e.target.value)}} value={colorCode} className='w-100 h-100' />
                        <div className='position-absolute' style={{ top: '105%', right: '0%', zIndex: '1' }}>
                            {colorToogle ?
                                <SketchPicker
                                    color={colorCode}
                                    onChange={(col) => { setColorcode(col.hex) }}
                                /> : null}
                        </div>
                    </div>
                    <button onClick={() => { setCopy(colorCode); colorCode.length !== 0 && setColorToogle(!colorToogle) }} className='col-3 btn btn-light '>Copy</button>
                </div>

                {/* user setting  */}
                <div className='p-2 align-left font-weight-bold'>User color settings:</div>

                {/* background  */}
                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userBackground }} >
                    <button className='col-5 border-0 text-left'>  Background  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userBackground} type='text' name='userBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* nav bar background  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userNavBackground }} >
                    <button className='col-5 border-0 text-left'>  Nav-Background  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userNavBackground} type='text' name='userNavBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userNavBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* nav bar background  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userNavTextColor }} >
                    <button className='col-5 border-0 text-left'>  Nav-Text-Color  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userNavTextColor} type='text' name='userNavTextColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userNavTextColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* navbar text active color  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userNavTextActiveColor }} >
                    <button className='col-5 border-0 text-left'>  Nav-Text-Active-Color  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userNavTextActiveColor} type='text' name='userNavTextActiveColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userNavTextActiveColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* footer background  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userFooterBackground }} >
                    <button className='col-5 border-0 text-left'>  Footer-Back  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userFooterBackground} type='text' name='userFooterBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userFooterBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* userFooterFontsized  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userFooterFontsize }} >
                    <button className='col-5 border-0 text-left'>  Footer-font-size  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userFooterFontsize} type='text' name='userFooterFontsize' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userFooterFontsize') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* userFooterTextColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userFooterTextColor }} >
                    <button className='col-5 border-0 text-left'>  Footer-text-color  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userFooterTextColor} type='text' name='userFooterTextColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userFooterTextColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* userButtonColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userButtonColor }} >
                    <button className='col-5 border-0 text-left'>  Button-color  </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userButtonColor} type='text' name='userButtonColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userButtonColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>


                {/* userButtonFontSize  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.userButtonFontSize }} >
                    <button className='col-5 border-0 text-left'>  Button-font-size </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.userButtonFontSize} type='text' name='userButtonFontSize' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('userButtonFontSize') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                <div className='p-2 align-left font-weight-bold'>Admin color settings:</div>


                {/* adminBackground  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminBackground }} >
                    <button className='col-5 border-0 text-left'>  Background </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminBackground} type='text' name='adminBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminBackground  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminNavBackground }} >
                    <button className='col-5 border-0 text-left'>  Nav-Background </button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminNavBackground} type='text' name='adminNavBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminNavBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminNavTextColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminNavTextColor }} >
                    <button className='col-5 border-0 text-left'>  Nav-Text-Color</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminNavTextColor} type='text' name='adminNavTextColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminNavTextColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>


                {/* adminNavTextActiveColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminNavTextActiveColor }} >
                    <button className='col-5 border-0 text-left'>  Nav-Text-Active-Color</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminNavTextActiveColor} type='text' name='adminNavTextActiveColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminNavTextActiveColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>


                {/* adminNavTextActiveColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminFooterBackground }} >
                    <button className='col-5 border-0 text-left'>  Footer-Color</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminFooterBackground} type='text' name='adminFooterBackground' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminFooterBackground') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminFooterFontsize  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminFooterFontsize }} >
                    <button className='col-5 border-0 text-left'>Footer-Font-Size</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminFooterFontsize} type='text' name='adminFooterFontsize' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminFooterFontsize') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminFooterTextColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminFooterTextColor }} >
                    <button className='col-5 border-0 text-left'>Footer-text-color</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminFooterTextColor} type='text' name='adminFooterTextColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminFooterTextColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminFooterTextColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminButtonColor }} >
                    <button className='col-5 border-0 text-left'>Button-color</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminButtonColor} type='text' name='adminButtonColor' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminButtonColor') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                {/* adminFooterTextColor  */}

                <div className='row border-1 p-1 m-1 w-100' style={{ maxWidth: '700px', background: colorPicker.adminButtonFontSize }} >
                    <button className='col-5 border-0 text-left'>Button-font-size</button>
                    <div className='col-4'>
                        <input onChange={onChangeHandeler} value={colorPicker.adminButtonFontSize} type='text' name='adminButtonFontSize' className='w-100 h-100' />
                    </div>
                    <button onClick={() => { colorSetHandeler('adminButtonFontSize') }} className='col-3 btn btn-light '>Paste</button>
                </div>

                <button onClick={sumitHandeler} className='btn btn-success m-1' style={{ width: '200px' }}>Save</button>

            </div>





        </div>
    );
};

export default ColorSettings;
// const {
//     userBackground,
//     userNavBackground,
//     userNavTextColor,
//     userNavTextActiveColor,
//     userFooterBackground,
//     userFooterFontsize,
//     userFooterTextColor,
//     userButtonColor,
//     userButtonFontSize,
//     adminBackground,
//     adminNavBackground,
//     adminNavTextColor,
//     adminNavTextActiveColor,
//     adminFooterBackground,
//     adminFooterFontsize,
//     adminFooterTextColor,
//     adminButtonColor,
//     adminButtonFontSize

// } = colorPicker;