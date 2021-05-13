import React from 'react';

const BetManagementHeader = ({headerTitle}) => {
    return (
        <div className='row my-auto '>
        <div className='col-6 text-left '><h5>{headerTitle}</h5> </div>
    
    </div>
    );
};

export default BetManagementHeader;