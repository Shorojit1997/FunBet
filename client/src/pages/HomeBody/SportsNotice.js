import React from 'react';
import {useSelector,shallowEqual} from 'react-redux'
import parse from 'html-react-parser';
import {
    Card, CardBody, CardHeader
} from 'reactstrap';

const SportsNotice = ({cardHeaderText}) => {
    const{generalSettings}=useSelector(state=>state.settings,shallowEqual)
    return (
        <div>
            <Card style={{backgroundColor:'#FDD50B',padding:'0px',margin:'0px'}}>
                <CardHeader style={{ fontWeight:'bold' }} >{ cardHeaderText}</CardHeader>
                <CardBody style={{margin:'0px',padding:'2px',overflow:'hiden'}}>
                    <div style={{background:'rgb(11, 76, 114)',color:'white',width:'100%',textAlign:'left',padding:'5px' }} >📢 {generalSettings.noticeText ? parse(generalSettings.noticeText):''} 🌏--</div>
                </CardBody>
            </Card>
        </div>
    );
};

export default SportsNotice;