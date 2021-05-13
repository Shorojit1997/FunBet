import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import * as Types from '../../Store/Types'
import {adminAccouuntTypeActionHandeler} from '../../Store/Actions/Admin/AdminAccountTypeAction'
import ModalExample1 from '../modal/ModalExample1'

const ActionController = ({ cell }) => {
    const[modal,setModal]=useState(false);
    const dispatch = useDispatch();

    
    // accepted deposit controler 
    const changeController = () => {
        const apiUrl = `/api/admin/account_type/changestatus/${cell.value._id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminAccouuntTypeActionHandeler());
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_ACCOUNT_TYPE_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
  // rejected deposit info

    const deleteController = () => {
        const apiUrl = `/api/admin/account_type/delete/${cell.value._id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminAccouuntTypeActionHandeler());
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_ACCOUNT_TYPE_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
    return (
        <div className='row ml-auto mr-auto'>
            <button onClick={changeController} className=' btn btn-sm btn-success m-1' >Change</button>
            {modal && <ModalExample1 modal={modal} setModal={setModal} info={cell.value} />}
            <button onClick={()=>setModal(!modal)} className='btn btn-sm  btn-info m-1'>Edit</button>
            <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'>Delete</button>
        </div>
    )
}
const columnsInfo = [
  
    {
        Header: 'NAME',
        accessor: 'col1',
    },
    {
        Header: 'NUMBER',
        accessor: 'col2',
    },
    {
        Header: 'STATUS',
        accessor: 'col3',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col4',
        Cell: ActionController
    },

]

export { columnsInfo };