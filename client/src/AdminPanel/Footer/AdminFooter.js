import React from 'react';
import {useSelector,shallowEqual} from 'react-redux'

const AdminFooter = () => {
    const {generalSettings,colorSettings} =useSelector(state=>state.settings,shallowEqual)
    return (
        <div className='admin_footer' style={{background:`${colorSettings.adminFooterBackground}`}}>
            <h5 style={{color:`${colorSettings.adminFooterTextColor}`,fontSize:`${colorSettings.adminFooterFontsize}`}}> {Object.keys(generalSettings).length!==0 ?  generalSettings.copyWriteText:'Copyright@ $ BetMe.com' }</h5>
        </div>
    );
};

export default AdminFooter;