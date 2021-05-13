import React from 'react';
import {useSelector,shallowEqual} from 'react-redux'
import parse from 'html-react-parser';
const MarqueeText = () => {
  const{generalSettings}=useSelector(state=>state.settings,shallowEqual)
    return (
     <div className ='marquee_text'>
      {generalSettings.noticeText ? parse(generalSettings.noticeText):''}
     </div>
     
    );
};

export default MarqueeText;