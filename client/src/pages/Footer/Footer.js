import React,{useEffect,useCallback} from 'react';
import {useSelector,shallowEqual,useDispatch} from 'react-redux';
import {SettingsActionHandeler} from '../../Store/Actions/Admin/AdminSettingsAction'
const Footer = () => {
    const{generalSettings,colorSettings}=useSelector(state=>state.settings,shallowEqual);
    const dispatch = useDispatch();

    const getSettings=useCallback(()=>{
        dispatch(SettingsActionHandeler());
        // dispatch(colorSettingsActionHandeler())
    },[dispatch])
    useEffect(() => {
        getSettings();
    }, [getSettings])

    return (
        <div className='footer_section'
         style={{
             background:colorSettings.userFooterBackground,
             fontSize:colorSettings.userFooterFontsize,
             color:colorSettings.userFooterTextColor,

             }}>
            <h4 style={{
                background:colorSettings.userFooterBackground,
                fontSize:colorSettings.userFooterFontsize,
                color:colorSettings.userFooterTextColor,
                }} className='fontControl'>{generalSettings.copyWriteText} </h4>
        </div>
    );
};

export default Footer;