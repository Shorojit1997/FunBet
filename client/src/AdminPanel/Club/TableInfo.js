import ReplayModal from './ReceiveMessage/ReplayModal';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux'
import {adminClubSendActionHandeler} from '../../Store/Actions/Club/AdminClubMessagAction';
import {visitActionHandeler} from '../../Store/Actions/Club/ClubLoginAction'
const ReplayButton = ({ cell }) => {
    const [modal, setModal] = useState(false);
    let handeler = () => {
        setModal(true);
    }
    return (
        <>
            {
                <ReplayModal
                    id={cell.value}
                    modal={modal}
                    setModal={setModal}
                />
            }
            <button onClick={handeler} className='btn btn-sm btn-dark'>Replay</button>
        </>
    )
}

const DeleteBtn=({cell})=>{
    const{userId,_id}=cell.value;
    const dispatch = useDispatch()
    const deleteHandeler=()=>{
        axios.post(`/api/admin/club/message/delete/${userId}`,{messageId:_id})
        .then(info=>{
            dispatch(adminClubSendActionHandeler());
        })
        .catch(e=>{})

    }
    return(
        <button onClick={deleteHandeler} className='btn btn-sm btn-danger'>Delete</button>
    )
}

const VisitControler=({cell})=>{
    const dispatch=useDispatch();
    const visitHandeler=()=>{
        dispatch(visitActionHandeler(cell.value))
    }
    return(
        <button onClick={visitHandeler} className='btn btn-sm btn-dark' >Login</button>
    )
}

export const columnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'CLUB_NAME',
        accessor: 'col2',
    },
    {
        Header: 'NAME',
        accessor: 'col3',
    },
    {
        Header: 'PHONE',
        accessor: 'col4',
    },
    {
        Header: 'LOGIN',
        accessor: 'col5',
        Cell:VisitControler,
    },

    {
        Header: 'EMAIL',
        accessor: 'col6',
    },
    {
        Header: 'MEMBERS',
        accessor: 'col7',
    },
    {
        Header: 'AMOUNT',
        accessor: 'col8',
    },

    {
        Header: 'CREATED_AT',
        accessor: 'col9',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col10',
    },

]


export const receivetable = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'SEND_BY',
        accessor: 'col2',
    },
    {
        Header: 'DATE',
        accessor: 'col3',
    },

    {
        Header: 'TIME',
        accessor: 'col4',
    },
    {
        Header: 'MESSAGE',
        accessor: 'col5',
    },
    {
        Header: 'REPLAY',
        accessor: 'col6',
        Cell: ReplayButton
    },

]

export const sendtable = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'SEND_TO',
        accessor: 'col2',
    },
    {
        Header: 'DATE',
        accessor: 'col3',
    },

    {
        Header: 'TIME',
        accessor: 'col4',
    },
    {
        Header: 'MESSAGE',
        accessor: 'col5',
    }
    ,
    {
        Header: 'ACTION',
        accessor: 'col6',
        Cell:DeleteBtn
    }
]

