import React, { useEffect, useState,useCallback } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminBetSingleElementHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import QuestionHeader from './QuestionHeader'
import { IoMdAddCircleOutline } from 'react-icons/io'
import AddQuestionModal from './AddQuestionModal'
import OptionList from './OptionList';

const QuestionList = () => {
    const { slug } = useParams();
    let { singleElement } = useSelector(state => state.adminBets, shallowEqual);
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();

    const callMethod = useCallback(() => {
        dispatch(adminBetSingleElementHandeler(slug))
    }, [dispatch,slug])

    useEffect(() => {
        callMethod();
    }, [callMethod])

   
    return (
        <div className='d-flex flex-row justify-content-center mb-2 addMargininStack'>


            <div className='card card-body ' style={{ minWidth: '400px', maxWidth: '900px' }}>
                {/* match heading */}
                {Object.keys(singleElement).length !== 0 &&
                    < div className='question_header mb-2'>
                        <img src={singleElement.picsUrl} alt='playpicture' />
                        <p>{singleElement.teamA} VS {singleElement.teamB} || {singleElement.turnamentName} || {dateforMate(singleElement.gameDate)} {singleElement.gameTime}</p>
                    </div>
                }
                {/* //question heading  */}
                <div className='row'>
                    <div className='col-6 text-left '><h5>Question lists </h5> </div>
                    <div className='col-6 text-right'>
                        {
                            modal &&
                            <AddQuestionModal
                                modal={modal}
                                setModal={setModal}
                                matchId={singleElement._id}
                            />
                        }
                        <button onClick={() => setModal(!modal)} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                    </div>
                </div>

                {
                    Object.keys(singleElement).length !== 0 ?
                        singleElement.questions.map((item, index) => {
                            return (
                                <div key={index} className='card m-2'>
                                    <QuestionHeader
                                        item={item}
                                        index={index}
                                        matchId={singleElement._id}
                                    />
                                    {
                                        item.options.length !== 0 && item.isShow==='Show' ?
                                            <>
                                                <div className='row font-weight-bold bg-light m-1 border-1'>
                                                    <div className='col-2 p-0'>Option</div>
                                                    <div className='col-2 p-0'>Rating</div>
                                                    <div className='col-2 p-0'>Placed</div>
                                                    <div className='col-2 p-0'>B_amount</div>
                                                    <div className='col-2 p-0'>R_amount</div>
                                                    <div className='col-2 p-0'>Action</div>
                                                </div>
                                                {  item.options.map((subItem, index) => {
                                                    return (
                                                        <OptionList
                                                         key={index+9}
                                                         item={subItem}
                                                         matchId={singleElement._id}
                                                         questionId={item._id}
                                                         isFinished={item.isFinished}
                                                         />
                                                    )
                                                })
                                                }
                                            </> : item.isShow==='Hide' ? 
                                             <div className='bg-light m-2 p-2'> Hide to users</div>:
                                            <div className='bg-light m-2 p-2'> There is no entry</div>
                                    }
                                </div>
                            )
                        }) : <div className='bg-light m-2 p-2'> There is no entry or hide</div>
                }
            </div>

        </div >
    );
};

export default QuestionList;


const dateforMate = (date) => {
    return date.slice(0, 10);
}