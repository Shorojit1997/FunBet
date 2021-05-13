import React, { useState, useEffect,useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {adminFinanceGetActionHandeler,adminFinancePostActionHandeler} from '../../Store/Actions/Admin/adminFinanceAction'

const styles={
    maxWidth:"350px",
    marginTop:'50px',
    marginBottom:'50px'
}

const FinanceSettings = () => {
    const { flashMessage } = useSelector(state => state.finance, shallowEqual);
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState({
        minimumDeposit: "",
        maximumDeposit: "",
        minimumWithdraw: "",
        maximumWithdraw: "",
        clubCommission: "",
        sponsorCommission: ""
    })

    const setDeatail = (e) => {
        setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
    }

    const getPost=useCallback(()=>{
         dispatch(adminFinanceGetActionHandeler(setAccountDetails));
    },[dispatch])

    useEffect(()=>{
        getPost();
    },[getPost])


    const saveHandeler=()=>{
        dispatch(adminFinancePostActionHandeler({accountDetails,setAccountDetails}))

    }

    return (
        <>
            <div className='d-flex justify-content-center w-100'>
                <div className='card card-body' style={styles}>
                    {
                        flashMessage && <div className="alert alert-warning  w-100 m-1">
                            {flashMessage}
                        </div>
                    }
                    <div className='form-group'>
                        <label htmlFor="name">Minimum Deposit:</label>
                        <input onChange={setDeatail} type="text" name='minimumDeposit' value={accountDetails.minimumDeposit} className="form-control" id="name" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name1">Maximum Deposit:</label>
                        <input onChange={setDeatail} type="text" name='maximumDeposit' value={accountDetails.maximumDeposit} className="form-control" id="name1" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name2">Minimum Withdraw:</label>
                        <input onChange={setDeatail} type="text" name='minimumWithdraw' value={accountDetails.minimumWithdraw} className="form-control" id="name2" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name3">Maximum Withdraw:</label>
                        <input onChange={setDeatail} type="text" name='maximumWithdraw' value={accountDetails.maximumWithdraw} className="form-control" id="name3" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name4">Club Commission:</label>
                        <input onChange={setDeatail} type="text" name='clubCommission' value={accountDetails.clubCommission} className="form-control" id="name4" />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="name5">Sponsor Commission:</label>
                        <input onChange={setDeatail} type="text" name='sponsorCommission' value={accountDetails.sponsorCommission} className="form-control" id="name5" />
                    </div>
                    <button onClick={saveHandeler} className="btn btn-sm btn-success" >Save</button>
             
                </div>
            </div>
        </>
    );
};

export default FinanceSettings;