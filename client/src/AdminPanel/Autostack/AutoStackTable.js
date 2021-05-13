import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as Types from '../../Store/Types'
import { adminStcknameActionHandeler } from '../../Store/Actions/Admin/AdminStacknameAction'
import AutoStackEditModal from './AutoStackEditModal'
import {useHistory} from 'react-router-dom'

const ActionController = ({ cell }) => {
    const { name, _id } = cell.value;
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const history=useHistory();


    // rejected deposit info
    const stackquestion=()=>{
        history.push(`/admin/stackquestion/${_id}`)
    }

    const deleteController = () => {
        const apiUrl = `/api/admin/bets/delete_autostackname/${_id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminStcknameActionHandeler());
            })
            .catch(error => {
                return dispatch({
                    type: Types.ADMIN_STACKNAME_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            })
    }
    return (
        <div className='row ml-auto mr-auto'>
            <button onClick={stackquestion} className=' btn btn-sm btn-success m-1' >Stack Option</button>
            {modal &&
                <AutoStackEditModal
                    modal={modal}
                    setModal={setModal}
                    name={name}
                    stackId={_id}
                />}
            <button onClick={() => setModal(!modal)} className='btn btn-sm  btn-info m-1'>Edit</button>
            <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'>Delete</button>
        </div>
    )
}
const columnsInfo = [

    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'GAME TYPE',
        accessor: 'col2',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col3',
        Cell: ActionController
    },

]

export { columnsInfo };