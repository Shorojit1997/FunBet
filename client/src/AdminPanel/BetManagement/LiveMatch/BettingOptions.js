import React from 'react';
import {useHistory} from 'react-router-dom'

const BettingOptions = ({cell}) => {
    const history=useHistory();
    return (
        <div className='d-flex justify-content-center ml-auto  mr-auto'>
            <button onClick={()=>{ history.push(`/admin/bet/match/questions/${cell.value}`)}} className='btn btn-sm btn-dark m-1'>Betting Option</button>
        </div>
    );
};

export default BettingOptions;

// history.push(`/admin/bet/match/questions/${cell.value._id}`)