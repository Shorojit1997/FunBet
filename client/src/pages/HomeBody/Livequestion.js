import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import {
    Card
} from 'reactstrap';


import ModalExample from '../modal/ModalExample'
import dateformat from 'dateformat'

const Livequestion = ({ item }) => {
    const [toogle, setToogle] = useState(true)
    const [modal, setModal] = useState(false);
    const [modalId, setModalId] = useState('');
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    
    const matchInfo = {
        name: `${item.teamA} VS ${item.teamB} || ${item.turnamentName} ||  ${dateformat(item.gameDate, "dd-mm-yy")} ${item.gameTime}`
    }
    return (
        <Card key={Math.random*993939} style={{ backgroundColor: '#0B4C72' }}>

            <div onClick={() => { setToogle(!toogle) }} className='question_header'>
                <img src={item.picsUrl} alt={item.picsUrl} />
                <p>{item.teamA} VS {item.teamB} || {item.turnamentName} ||  {dateformat(item.gameDate, "dd-mm-yy")} {item.gameTime}</p>
            </div>
            {
                toogle && (
                    <div key={Math.random*993939} className='question_body col-12'>
                        {
                            item.questions.map((question, index) => {

                                return (
                                    <div key={Math.random()*77777}>
                                        {question.isFinished === 'No' &&
                                            <div key={Math.random()*10000}>
                                                <div className='question_type col-12' style={{ background: colorSettings.userBackground }}> {question.question} <p>{item.playStatus==='Live'? 'Live':'Up'}</p> </div>
                                                <div className='question_option'>
                                                    {
                                                        question.options.map(option => {
                                                            return (
                                                                <div onClick={() => { setModal(!modal); setModalId(option._id); }} key={Math.random()*17009} className='question_option_one'>
                                                                    {
                                                                        (modalId === option._id) &&
                                                                        <ModalExample
                                                                            matchId={item._id}
                                                                            questionId={question._id}
                                                                            option={option}
                                                                            questionName={question.question}
                                                                            matchInfo={matchInfo}
                                                                            modal={modal}
                                                                            setModal={setModal}
                                                                            setModalId={setModalId}
                                                                            pics={item.picsUrl}
                                                                        />
                                                                    }
                                                                    <h5 >{option.option} </h5>
                                                                    <p>{option.rating} </p>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                </div>
                                            </div>

                                        }

                                    </div>

                                )

                            })
                        }

                    </div>
                )
            }

        </Card>
    );
};

export default Livequestion;