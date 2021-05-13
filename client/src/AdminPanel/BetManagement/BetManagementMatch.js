import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { adminBetsActionHandeler } from '../../Store/Actions/Admin/AdminBetAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {columnsInfo} from './LiveMatch/BetsTableInfo'
import MakeTable from '../Table/MakeTable'
import AddGameModal from './LiveMatch/AddGameModal';

const BetManagementMatch = () => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const{betsList} =useSelector(state=>state.adminBets,shallowEqual)

    useEffect(() => {
        dispatch(adminBetsActionHandeler());
    }, [dispatch])



    return (
        <div className='dashboard'>
            <div className='row my-auto '>
               
                <div className='col-6 text-left '><h5>Betting panel </h5> </div>
                <div className='col-6 text-right'>
                    {modal && <AddGameModal modal={modal} setModal={setModal} />}
                    <button onClick={() => { setModal(!modal) }} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                </div>
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={betsList} />}
            </div>
        </div>
    );
};

export default BetManagementMatch;