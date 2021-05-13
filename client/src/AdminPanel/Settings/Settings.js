import React, { lazy, Suspense, useState, useEffect } from 'react';

import SettingsHeader from './SettingsHeader';
import { pictureAction } from '../../Store/Actions/PictureAction'
import { SettingsActionHandeler } from '../../Store/Actions/Admin/AdminSettingsAction'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Gallary from './Gallary';
// import ImageModal from '../ImageModal/ImageModal'

import axios from 'axios'
const ImageModal = lazy(() => import('../ImageModal/ImageModal'));
const GeneralSettings = lazy(() => import('./GeneralSettings'));
const ColorSettings = lazy(() => import('./ColorSettings'));
const GameSlider = lazy(() => import('../Slider/GameSlider'));


const Settings = () => {
    const [btnNumber, setBtnNumber] = useState(1);
    const [modal, setModal] = useState(false);
    const { pictures, flashMessage } = useSelector(state => state.pictures, shallowEqual)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pictureAction());
        dispatch(SettingsActionHandeler());
    }, [dispatch])

    const setIconImageHandeler = (_id) => {
        axios.post(`/api/admin/icon_uploads/${_id}`)
            .then(info => {
                dispatch(SettingsActionHandeler());
                setModal(!modal)
            })
            .catch(e => {

            })
    }

    return (
        <div className='dashboard'>
            <SettingsHeader headerTitle='Settings' />
            <div className='card card-body'>
                <div className='row'>
                    <button onClick={() => { setBtnNumber(1) }} className={btnNumber === 1 ? 'btn btn-info m-1' : 'btn setting_btn'} >General</button>
                    <button onClick={() => { setBtnNumber(2) }} className={btnNumber === 2 ? 'btn btn-info m-1' : 'btn setting_btn'}>Gallary</button>
                    <button onClick={() => { setModal(!modal) }} className={btnNumber === 3 ? 'btn btn-info m-1' : 'btn setting_btn'}>Logo</button>
                    <button onClick={() => { setBtnNumber(4) }} className={btnNumber === 4 ? 'btn btn-info m-1' : 'btn setting_btn'}>Color</button>
                    <button onClick={() => { setBtnNumber(5) }} className={btnNumber === 5 ? 'btn btn-info m-1' : 'btn setting_btn'}>Slider</button>
                </div>
                {
                    btnNumber === 1 && <GeneralSettings />
                }
                <Suspense fallback={<div>Loading Component</div>}>
                    {
                        btnNumber === 2 && <Gallary />
                    }

                    {
                        modal &&
                        <ImageModal
                            modal={modal}
                            setModal={setModal}
                            pictures={pictures}
                            flashMessage={flashMessage}
                            setImageHandeler={setIconImageHandeler}
                            headerTitle='Change app icon'
                        />
                    }
                    {
                        btnNumber === 4 && <ColorSettings />
                    }
                    {
                        btnNumber===5 && <GameSlider/>
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default Settings;