import React, { useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import EditOptionModal from './EditOptionModal'
import { adminBetSingleElementHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as Types from '../../../Store/Types';

const OptionList = ({ item, matchId, questionId,isFinished }) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    const DeleteOptins = () => {
        const apiUrl = `/api/admin/bets/deleteoption/${matchId}`
        axios.post(apiUrl, { optionId: item._id ,questionId:questionId })
            .then(data => {
                dispatch(adminBetSingleElementHandeler( matchId ));

            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }

    const winOptinsHandeler = () => {
        const apiUrl = `/api/admin/bets/winoption/${matchId}`
        axios.post(apiUrl, { optionId: item._id ,questionId:questionId })
            .then(data => {
                dispatch(adminBetSingleElementHandeler( matchId ));

            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }

    return (
        <div className={item.winStatus==='Win'?'row text-success m-1 border-1 font-weight-bold':'row bg-light m-1 border-1'}>
            <div className='col-2 p-0'>{item.option}</div>
            <div className='col-2 p-0'>{item.rating}</div>
            <div className='col-2 p-0'>{item.userId.length}</div>
            <div className='col-2 p-0'>{item.betAmount}</div>
            <div className='col-2 p-0'>{item.returnAmount}</div>
            <div className='col-2 p-0 justify-content-end'>
                {
                    modal && 
                    <EditOptionModal 
                      matchId={matchId}
                      questionId={questionId}
                      item={item}
                      modal={modal}
                      setModal={setModal}
                    />
                }
                {isFinished==='No' && <button onClick={winOptinsHandeler} className='btn btn-sm  btn-outline-success  m-1'>Win</button>}
                <button onClick={() => setModal(!modal)} className='btn btn-sm  btn-outline-info m-1'><AiOutlineEdit /></button>
                <button onClick={DeleteOptins} className='btn btn-sm btn-outline-danger m-1'><AiFillDelete /> </button>
            </div>
        </div>
    );
};

export default OptionList;