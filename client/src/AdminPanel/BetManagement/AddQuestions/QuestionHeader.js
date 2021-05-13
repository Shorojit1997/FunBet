import React, { useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiMessageRoundedAdd ,BiHide,BiShow} from 'react-icons/bi'
import { adminBetSingleElementHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import { useDispatch } from 'react-redux'
import AddOptionModal from './AddOptionModal'
import EditQuestionModal from './EditQuestionModal'
import axios from 'axios'
import * as Types from '../../../Store/Types';

const QuestionHeader = ({matchId, item, index }) => {
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const dispatch = useDispatch();
    const deleteQuestions=()=>{
        const apiUrl=`/api/admin/bets/deletequestion/${matchId}`
        axios.post(apiUrl,{questionId:item._id} )
            .then(data => {
                dispatch(adminBetSingleElementHandeler(matchId));
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }
    const showController=()=>{
        const apiUrl=`/api/admin/bets/showquestion/${matchId}`
        axios.post(apiUrl,{questionId:item._id} )
            .then(data => {
                dispatch(adminBetSingleElementHandeler(matchId));
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_BET_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }
    const hideController=()=>{
        const apiUrl=`/api/admin/bets/hidequestion/${matchId}`
        axios.post(apiUrl,{questionId:item._id} )
            .then(data => {
                dispatch(adminBetSingleElementHandeler(matchId));
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
        <div className='row bg-dark m-1' style={{ borderRadius: '5px' }}>

            {
                modal && 
                <AddOptionModal
                  modal={modal}
                  setModal={setModal}
                  matchId={matchId}
                  questionId={item._id}
                
                />
            }
             {
                modal1 && 
                <EditQuestionModal
                  modal={modal1}
                  setModal={setModal1}
                  matchId={matchId}
                  questionId={item._id}
                  name={item.question}
                />
            }
            <div className='col-6 text-light d-flex justify-content-sm-start align-items-center p-1'> {index + 1})  {item.question} </div>
            <div className='col-6 d-flex justify-content-end'>
                <button onClick={() => { setModal(!modal); }} className='btn btn-success m-1' ><BiMessageRoundedAdd /> </button>
                <button onClick={() => { setModal1(!modal1); }} className='btn btn-sm  btn-info m-1'><AiOutlineEdit /></button>
                 {item.isShow==='Show' ?
                  <button onClick={hideController} className='btn btn-sm  btn-warning m-1'><BiHide /></button>:
                <button onClick={showController} className='btn btn-sm  btn-warning m-1'><BiShow /></button>}
                <button onClick={() => { deleteQuestions() }} className='btn btn-sm btn-danger m-1'><AiFillDelete /> </button>
            </div>
        </div>
    );
};

export default QuestionHeader;