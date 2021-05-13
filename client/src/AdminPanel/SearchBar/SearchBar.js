import React from 'react';

const SearchBar = ({setPageSize,setGlobalFilter}) => {
    return (
        <div className='row row_style full-width'>
            <div className=' col-6 text-left align-middle'>
                <select onChange={(e)=>{setPageSize(e.target.value)}}  className="custom-select set_width" id="validationCustom04" required>
                    <option value="1000">All</option>
                    <option value='10' >10</option>
                    <option value='20'  >20</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
            </div>
            <div className='col-6 text-right'>
                <input type="text" onChange={(e)=>{setGlobalFilter(e.target.value || undefined)}} className="search_bar_width" placeholder="Search..." /> 
            </div>
        </div>
    );
};

export default SearchBar;