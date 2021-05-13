import React from 'react';

const DashbordHeader = ({headerTitle}) => {
    return (
        <div className='row my-auto '>
            <div className='col-6 text-left '><h5>{headerTitle}</h5> </div>
            <div className='col-6 text-right'>
                <select className="custom-select set_width" id="validationCustom04" required>
                    <option value="">All</option>
                    <option>Today</option>
                    <option>Last 7 days</option>
                    <option>Last 10 days</option>
                    <option>Last 15 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>
        </div>
    );
};

export default DashbordHeader;