import React,{useState} from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import EditOptionModal from './EditOptionModal'
import { adminStckActionHandeler } from '../../../Store/Actions/Admin/AdminAutostackAction'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as Types from '../../../Store/Types';

const AddStackOption = ({item,gameId,questionId}) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();


    const stackDeleteController=()=>{
        const apiUrl = `/api/admin/bets/deleteoption_autostack/${questionId}`
        axios.post(apiUrl, {optionId:item._id})
            .then(data => {
                dispatch(adminStckActionHandeler({ questionId: gameId }));
       
            })
            .catch(e => {
                dispatch({
                    type: Types.ADMIN_STACK_ERROR, payload: {
                        flashMessage: 'Please try again..'
                    }
                })
            })
    }
    return (
        <div  className='row bg-light m-1 border-1'>
            <div className='col-8'>
                <div className='row'>
                    <div className='col-8'>{item.option}</div>
                    <div className='col-4'>{item.rating}</div>
                </div>
            </div>
            <div className='col-4 d-flex justify-content-end'>
                {
                    modal && 
                    <EditOptionModal 
                      gameId={gameId}
                      questionId={questionId}
                      optionId={item._id}
                      rating={item.rating}
                      option={item.option}

                      modal={modal}
                      setModal={setModal}
                    />
                }
                <button onClick={()=>setModal(!modal)} className='btn btn-sm   btn-outline-success m-1'><AiOutlineEdit /></button>
                <button onClick={stackDeleteController} className='btn btn-sm btn-outline-danger m-1'><AiFillDelete /> </button>
            </div>
        </div>
    );
};

export default AddStackOption;