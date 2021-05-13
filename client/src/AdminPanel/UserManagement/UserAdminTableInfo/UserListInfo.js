import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'
import { adminDetailsActionHandeler } from '../../../Store/Actions/Admin/AdminListAction'
import React, {useState} from 'react'
import AdminEditModal from './AdminEditModal'


const ActionController = ({ cell }) => {

    const dispatch = useDispatch();
    const { info } = useSelector(state => state.adminLogin, shallowEqual)
    const[modal,setModal]=useState(false);
    const changeStatusController = () => {
        const apiUrl = `/api/admin/change_active_status/${cell.value._id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminDetailsActionHandeler());
            })
            .catch(error => {
                return dispatch({
                    type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            })
    }
    const deleteController = () => {
        const apiUrl = `/api/admin/delete/${cell.value._id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminDetailsActionHandeler());
            })
            .catch(error => {
                return dispatch({
                    type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            })
    }
    const{name,email,phone,username,_id}=cell.value;
    return (
        <div className='table_action ml-auto mr-auto'>
            {
                modal && <AdminEditModal
                modal={modal}
                setModal={setModal}
                name={name}
                email={email}
                phone={phone}
                username={username}
                adminId={_id}
                />
            }
            {
                info.username === cell.value.username ?
                <button onClick={()=>{setModal(!modal)}}  className='btn btn-sm  btn-success m-1' >Edit</button>
                : 
                <button onClick={()=>{setModal(!modal)}} disabled className='btn btn-sm  btn-success m-1' >Edit</button>
            }
            { 
            info.role === 'Super_admin' &&
                <>
                    <button onClick={changeStatusController} className={cell.value.activeStatus === 'Active' ? 'btn btn-sm btn-warning m-1' : 'btn btn-sm btn-info m-1'}>{cell.value.activeStatus === 'Active' ? 'Inactive' : 'Active'}</button>
                    <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'><AiFillDelete /></button>
                </>
            }
        </div>
    )
}
const columnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'NAME',
        accessor: 'col2',
    },
    {
        Header: 'USERNAME',
        accessor: 'col3',
    },
    {
        Header: 'PHONE',
        accessor: 'col4',
    },

    {
        Header: 'EMAIL',
        accessor: 'col5',
    },
    {
        Header: 'ROLE',
        accessor: 'col6',
    },
    {
        Header: 'REQUESTED AT',
        accessor: 'col7',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col8',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col9',
        Cell: ActionController
    },

]

export { columnsInfo };