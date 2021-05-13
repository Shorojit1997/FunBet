import React,{useState} from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiMessageRoundedAdd } from 'react-icons/bi'
import EditStackModal from './EditStackModal'
import AddOptionModal from './AddOptionModal'

const QuestionHeader = ({ gameId, item, deleteQuestions,index }) => {
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    return (
        <div className='row bg-dark m-1' style={{ borderRadius: '5px' }}>
            <div className='col-6 text-light d-flex justify-content-sm-start align-items-center p-1'>{index+1})  {item.question} </div>
            {
                modal &&
                <EditStackModal
                    gameId={gameId}
                    questionId={item._id}
                    modal={modal}
                    questionName={item.question}
                    setModal={setModal}
                />
            }
            <div className='col-6 d-flex justify-content-end'>
                {
                    modal1 &&
                    <AddOptionModal
                        modal={modal1}
                        setModal={setModal1}
                        questionId={item._id}
                        gameId={gameId}
                    />
                }
                <button onClick={() => { setModal1(!modal1); }} className='btn btn-info m-1' ><BiMessageRoundedAdd /> </button>
                <button onClick={() => { setModal(!modal); }} className='btn btn-sm  btn-success m-1'><AiOutlineEdit /></button>
                <button onClick={() => { deleteQuestions(item._id) }} className='btn btn-sm btn-danger m-1'><AiFillDelete /> </button>
            </div>
        </div>
    );
};

export default QuestionHeader;