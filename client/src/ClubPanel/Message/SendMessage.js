import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { IoMdAddCircleOutline } from 'react-icons/io';
import MakeTable from '../../AdminPanel/Table/MakeTable';
import {ClubSendMessageAction} from '../../Store/Actions/Club/ClubMessageAction'
import AddMessageModal from './AddMessageModal';
import {columnsInfo} from './SendMessageTable'

const Autostack = () => {
    const [modal, setModal] = useState(false);
    const {sendlist} =useSelector(state=>state.clubMessage,shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ClubSendMessageAction());
    }, [dispatch])



    return (
        <div className='dashboard'>
            <div className='row my-auto '>
                <div className='col-6 text-left '><h5>Send message</h5> </div>
                <div className='col-6 text-right'>
                    {
                        modal &&
                        <AddMessageModal
                            modal={modal}
                            setModal={setModal}
                        />
                    }
                    <button onClick={() => { setModal(!modal) }} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add message</button>
                </div>
            </div>
            <div className='row my-auto center'>
                {<MakeTable columnsInfo={columnsInfo} columnData={sendlist} />}
            </div>

        </div>
    );
};

export default Autostack;