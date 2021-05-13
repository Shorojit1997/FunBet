import React from 'react';

const DashboardItem = ({itemData}) => {
    return (
        <div className='col-lg-5 col-md-5 col-sm-6 col-12 set_margin'>
            <div className='dashboard_item'>
                <div className='item_width for_symbol'>
                    <div className='symbol_item' style={{background:`${itemData.color}`,border:`${itemData.color}`}}>
                        <h1>{itemData.symbol} </h1>
                    </div>
                </div>
                <div className='item_width for_number'>
                    <div className='first-text_item'>{itemData.number} </div>
                    <div className='second-text_item'>{itemData.name} </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;