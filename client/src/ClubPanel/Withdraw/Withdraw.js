import React, { useState, useEffect } from 'react';
import axios from 'axios'


const BankWithdraw = () => {
    const [account, setAccount] = useState([{ accountName: '', accountNumber: '' }]);
    const [flashMessage, setFlashmessage] = useState('');
    const [accountDetails, setAccountDetails] = useState(
        {
            method: '',
            transferTo: '',
            amount: '',
            acccountType: ''

        })
    useEffect(() => {
        axios.get('/api/user/account_name')
            .then(info => {
                setAccount(info.data.data)
                console.log(info.data)
            })
    }, [])


    const accountDetailsHandeler = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
    }

    const submitHandeler = () => {
        axios.post('/api/club/withdraws', accountDetails)
            .then(info => {
                if (info) {
                    setFlashmessage(info.data.flashMessage);
                    setAccountDetails({
                        method: '',
                        transferTo: '',
                        amount: '',
                        accountType: ''
                    })
                }
            })
            .catch(error => {
                setFlashmessage(error.response.data.flashMessage)
            })
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{marginTop:'60px'}}  >
            <div className='deposit_div' style={{ background: '#222',maxWidth:'500px' }}>
                {flashMessage && <div className="alert alert-warning  w-100 m-2">{flashMessage} </div>}
                <div className='deposit_header'>Create a withdraw request</div>

                <select onChange={accountDetailsHandeler} id='account_name' value={accountDetails.method} className='select_style_set' name="method">
                    <option value=''>Select</option>
                    {
                        account && account.map((item, index) => {

                            return (<option key={index} value={item.accountName}>{item.accountName}</option>)
                        })
                    }
                </select>
                <select onChange={accountDetailsHandeler} placeholder='somethin' className='select_style_set' id='withdraw_account_name' name="accountType">
                    <option value=''>Select</option>
                    <option value="agent">Agent</option>
                    <option value="personal">Personal</option>
                </select>
                <input onChange={accountDetailsHandeler} type='text' className='input_style_set' placeholder='Amount' name='amount' />
                <input onChange={accountDetailsHandeler} type='text' className='input_style_set' placeholder='Account Number' name='transferTo' />
                <button onClick={submitHandeler} className='button_style_set' >CREATE WITHDRAW REQUEST</button>

            </div>
        </div>
    );
};

export default BankWithdraw;