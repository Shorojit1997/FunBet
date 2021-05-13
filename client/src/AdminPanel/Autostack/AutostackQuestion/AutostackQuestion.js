import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom'
import { adminStckActionHandeler } from '../../../Store/Actions/Admin/AdminAutostackAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { IoMdAddCircleOutline } from 'react-icons/io';

import AutoStactModal from './AddStackModal'

import axios from 'axios'
import AddStackOption from './AddStackOption';
import QuestionHeader from './QuestionHeader';

const AutostackQuestion = () => {


    const [modal, setModal] = useState(false);

    const { slug } = useParams();
    const dispatch = useDispatch();
    const { stack } = useSelector(state => state.adminStack, shallowEqual)

    const callMethod = useCallback(() => {
        dispatch(adminStckActionHandeler({ questionId: slug }))
    }, [slug, dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod])

    const deleteQuestions = (_id) => {
        axios.post(`/api/admin/bets/delete_autostack/${_id}`, { gameId: slug })
            .then((info) => {
                dispatch(adminStckActionHandeler({ questionId: slug }))
            })
            .catch(e => {

            })
    }

    return (
        <div className='d-flex  justify-content-center mb-2 addMargininStack' >
            <div className='card card-body ' style={{ minWidth: '400px', maxWidth: '800px' }}>
                <div className='row'>
                    <div className='col-6 text-left '><h5>Autostack lists </h5> </div>
                    <div className='col-6 text-right'>
                        {
                            modal &&
                            <AutoStactModal
                                modal={modal}
                                setModal={setModal}
                                gameId={slug}

                            />
                        }
                        <button onClick={() => { setModal(!modal) }} className="btn btn-success set_width" ><IoMdAddCircleOutline /> Add</button>
                    </div>
                </div>

                {
                    stack.length ? stack.map((item, index) => {
                        return (
                            <div key={index} className='card m-2'>
                                {
                                    <QuestionHeader
                                        key={index + 1}
                                        item={item}
                                        gameId={slug}
                                        index={index}
                                        deleteQuestions={deleteQuestions}
                                    />
                                }
                                {
                                    item.options.length ?
                                        item.options.map((opt, i) => {
                                            return (
                                                <AddStackOption key={i} item={opt} gameId={slug} questionId={item._id} />
                                            )
                                        }) :
                                        <div className='bg-light m-2 p-2'> There is no entity</div>
                                }
                            </div>
                        )
                    }) :
                        <div className='bg-light m-2 p-2'> There is no entity</div>
                }

            </div>

        </div>
    );
};

export default AutostackQuestion;