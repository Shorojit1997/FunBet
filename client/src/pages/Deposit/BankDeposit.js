import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { useSelector, shallowEqual } from 'react-redux'

const BankDeposit = () => {
    const [account, setAccount] = useState([{ accountName: '', accountNumber: '' }]);
    const [accountNum, setAccountNum] = useState([{ accountName: '', accountNumber: '' }]);
    const [flashMessage, setFlashmessage] = useState('');
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const [accountDetails, setAccountDetails] = useState(
        {
            method: '',
            transferTo: '',
            amount: '',
            transferFrom: '',
            transactionId: '',
        })
    const setAccountType = useCallback(() => {
        axios.get('api/user/account_name')
            .then(info => {
                setAccount(info.data.data)
            })
            .catch(e => {
            })
    }, [])

    useEffect(() => {
        setAccountType();
    }, [setAccountType])


    const setAccountNumberSelectHandeler = () => {
        let nnew = account.filter(item => {
            return item.accountName === accountDetails.method
        })
        setAccountNum(nnew);
    }

    const accountDetailsHandeler = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
        setAccountNumberSelectHandeler();


    }
    const submitHandeler = () => {
        console.log(accountDetails);
        axios.post('/api/user/deposits', accountDetails)
            .then(info => {
                if (info) {
                    console.log('yes');
                    setFlashmessage(info.data.flashMessage);
                    setAccountDetails({
                        method: '',
                        transferTo: '',
                        amount: '',
                        transferFrom: '',
                        transactionId: '',
                    })
                }
            })
            .catch(error => {
                console.log('no')
                setFlashmessage(error.response.data.flashMessage)
            })
    }

    return (
        <div id='_deposit' className='deposit_main' style={{ background: colorSettings.userNavBackground }} >
            <div className='deposit_div'>
                {flashMessage && <div className="alert alert-warning  w-100 m-1">{flashMessage} </div>}
                <div className='deposit_header'>Create a deposit request</div>

                <select onChange={accountDetailsHandeler} id='account_name' value={accountDetails.method} className='select_style_set' name="method">
                    <option value='' >Select</option>
                    {
                        account && account.map((item, index) => {

                            return (<option key={index} value={item.accountName}>{item.accountName}</option>)
                        })
                    }
                </select>
                <input type='text' onChange={accountDetailsHandeler} className='input_style_set' value={accountDetails.transferFrom} name='transferFrom' placeholder='Account Number' />
                <select onChange={accountDetailsHandeler} value={accountDetails.transferTo} className='select_style_set' name="transferTo">
                    <option value='' >Select</option>
                    {
                        accountDetails.method && accountNum.map((item, index) => {
                            return (<option key={index} value={item.accountNumber}> {item.accountNumber}</option>)

                        })
                    }
                </select>
                <input type='text' onChange={accountDetailsHandeler} className='input_style_set' value={accountDetails.amount} name='amount' placeholder='Amount' />
                <input type='text' onChange={accountDetailsHandeler} className='input_style_set' value={accountDetails.transactionId} name='transactionId' placeholder='Transaction Id' />
                <button onClick={submitHandeler} className='button_style_set' >CREATE DEPOSIT REQUEST</button>

            </div>
        </div>
    );
};

export default BankDeposit;