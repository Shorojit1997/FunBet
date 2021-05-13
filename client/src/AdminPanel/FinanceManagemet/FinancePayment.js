import React, { useEffect,useState,useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { adminAccouuntTypeActionHandeler } from '../../Store/Actions/Admin/AdminAccountTypeAction'
import MakeTable from '../Table/MakeTable'
import {columnsInfo} from './PaymentTable'
import ModalExample from '../modal/ModalExample';

const FinancePayment = () => {
    const[modal,setModal]=useState(false);
    const dispatch = useDispatch()
    const { TypeInfo } = useSelector(state => state.adminAccountType, shallowEqual);

    const callMethod = useCallback(() => {
        dispatch(adminAccouuntTypeActionHandeler());
    }, [dispatch])
    useEffect(() => {
        callMethod();
    }, [callMethod])

   

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Payment methods </h5> </div>
                <div className='col-6 text-right'>
                    {
                        modal &&
                        <ModalExample 
                        modal={modal}
                        setModal={setModal}
                        />
                    }
                    <button onClick={()=>{setModal(!modal)}} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                </div>
            </div>
            <div className='row my-auto center'>
                {TypeInfo.length !== 0 && <MakeTable columnsInfo={columnsInfo} columnData={TypeInfo} />}
            </div>

        </div>
    );
};

export default FinancePayment;