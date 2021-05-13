import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { adminStcknameActionHandeler } from '../../Store/Actions/Admin/AdminStacknameAction'
import MakeTable from '../Table/MakeTable'
import { columnsInfo } from './AutoStackTable'
import AutoStackAddModal from './AutoStackAddModal';
const Autostack = () => {
    const[modal,setModal]=useState(false);
    const dispatch = useDispatch()
    const { stackName } = useSelector(state => state.adminStackName, shallowEqual);

    useEffect(() => {
        dispatch(adminStcknameActionHandeler());
    }, [dispatch])

   

    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>AutoStack List </h5> </div>
                <div className='col-6 text-right'>
                    {
                        modal &&
                        <AutoStackAddModal
                            modal={modal}
                            setModal={setModal}
                        />
                    }
                    <button onClick={() => { setModal(!modal) }} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                </div>
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={stackName} />}
            </div>

        </div>
    );
};

export default React.memo(Autostack);