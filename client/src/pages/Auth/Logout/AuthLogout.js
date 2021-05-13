import React from 'react';

const AuthLogout = () => {
    return (
        <div className='deposit_main'>
        <div className='deposit_div'>
            <div className='deposit_header'>Create a deposit request</div>

            <select id='account_name' name="account_name">
                <option value="volvo">Bkash</option>
                <option value="saab">Nagod</option>
            </select>
            <input type='text' placeholder='Select Deposited Account' />
            <input type='text' placeholder='Amount' />
            <input type='text' placeholder='Account Number' />
            <input type='text' placeholder='Transaction Id' />
            <input type='password' placeholder='Enter Your Password' />
            <button>CREATE DEPOSIT REQUEST</button>

        </div>
    </div>
    );
};

export default AuthLogout;