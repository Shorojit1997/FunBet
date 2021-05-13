import React, { useState, useEffect, useCallback } from 'react';
import MyStatefulEditor from './MyStatefulEditor'
import { adminSettingsActionHandeler } from '../../Store/Actions/Admin/AdminSettingsAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const GeneralSettings = () => {

    const { generalSettings } = useSelector(state => state.settings, shallowEqual);
    const dispatch = useDispatch();

    const [settingsInfo, setSettingsInfo] = useState({
        title: 'title',
        email: '',
        phone: '',
        year: '',
        copyWriteText: '',
        websiteName: '',
        noticeText: '',
    })

    const callMethod = useCallback(() => {
        if (Object.keys(generalSettings).length !== 0) {
            setSettingsInfo({
                title: generalSettings.title,
                email: generalSettings.email,
                phone: generalSettings.phone,
                year: generalSettings.year,
                copyWriteText: generalSettings.copyWriteText,
                websiteName: generalSettings.websiteName,
                noticeText: generalSettings.noticeText,
            })
        }
    }, [generalSettings])


    useEffect(() => {
        callMethod();
    }, [callMethod])

    const onChangeHandeler = (e) => {
        setSettingsInfo({ ...settingsInfo, [e.target.name]: e.target.value })
    }
    const setInfoHandeler = () => {
        dispatch(adminSettingsActionHandeler(settingsInfo))
    }
    return (
        <div className='row'>
            <div className='col-md-6 col-12 my-1'>
                <label className='settings_label'>App title</label>
                <input onChange={onChangeHandeler} type='text' placeholder='Enter your app title' name='title' value={settingsInfo.title} className='setting_input' />
            </div>
            <div className='col-md-6 col-12  my-1'>
                <label className='settings_label'>Primary Email</label>
                <input onChange={onChangeHandeler} type='email' placeholder='Enter your app title' name='email' value={settingsInfo.email} className='setting_input' />
            </div>
            <div className='col-md-6 col-12 my-1'>
                <label className='settings_label'>Phone</label>
                <input onChange={onChangeHandeler} type='text' placeholder='Enter your phone number...' name='phone' value={settingsInfo.phone} className='setting_input' />
            </div>
            <div className='col-md-6 col-12 my-1'>
                <label className='settings_label'>Year</label>
                <input onChange={onChangeHandeler} type='text' placeholder='Year...' name='year' value={settingsInfo.year} className='setting_input' />
            </div>
            <div className='col-md-6 col-12 my-1'>
                <label className='settings_label'>Copyright Text</label>
                <input onChange={onChangeHandeler} type='text' placeholder='Copyright Text...' name='copyWriteText' value={settingsInfo.copyWriteText} className='setting_input' />
            </div>
            <div className='col-md-6 col-12 my-1'>
                <label className='settings_label'>Website</label>
                <input onChange={onChangeHandeler} type='text' placeholder='Website name...' name='websiteName' value={settingsInfo.websiteName} className='setting_input' />
            </div>
            <div className='col-12 my-1'>
                <label className='settings_label'>Notice text</label>
                <MyStatefulEditor
                    settingsInfo={settingsInfo}
                    setSettingsInfo={setSettingsInfo}
                    generalSettings={generalSettings}
                />
            </div>
            <div className='col-3 my-3 text-left'>
                <button onClick={setInfoHandeler} className='btn btn-success w-100'>Submit</button>

            </div>
        </div>
    );
};

export default GeneralSettings;