import axios from 'axios'
import { useDispatch } from 'react-redux'
import * as Types from '../../../Store/Types'
import { adminUserDetailsActionHandeler } from '../../../Store/Actions/Admin/AdminUserListAction'
import { adminVisitActionHandeler } from '../../../Store/Actions/LoginAction'
import React, { useState } from 'react'
import UserEditModal from './UserEditModal'
const ActionController = ({ cell }) => {
    const { _id, name, phone, email, username, sponsorName, clubName, activeStatus } = cell.value;

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const changeStatusController = () => {
        const apiUrl = `/api/admin/user/change_active_status/${_id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminUserDetailsActionHandeler());
            })
            .catch(error => {
                return dispatch({
                    type: Types.USER_LIST_ERROR, payload: {
                        flashMessage: error.response.data.flashMessage
                    }
                })
            })
    }
    return (
        <div className='table_action ml-auto mr-auto'>
            {
                modal && <UserEditModal
                    modal={modal}
                    setModal={setModal}
                    name={name}
                    email={email}
                    phone={phone}
                    username={username}
                    clubName={clubName}
                    sponsorName={sponsorName}
                    userId={_id}
                />
            }

            <button onClick={() => { setModal(!modal) }} className='btn btn-sm  btn-success m-1' >Edit</button>
            <button onClick={changeStatusController} className={activeStatus === 'Active' ? 'btn btn-sm btn-warning m-1' : 'btn btn-sm btn-info m-1'}>{activeStatus === 'Active' ? 'Inactive' : 'Active'}</button>
        </div>
    )
}

const UserVisiting = ({ cell }) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const visitController = () => {
        setModal(true)
        dispatch(adminVisitActionHandeler(cell.value, setModal));
    }

    return (
        <>
            {modal ?
                <button onClick={visitController} disabled className='btn btn-sm btn-dark'>Login</button> :
                <button onClick={visitController} className='btn btn-sm btn-dark'>Login</button>
            }
        </>
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
        Header: 'SPONSORNAME',
        accessor: 'col6',
    },
    {
        Header: 'CLUBNAME',
        accessor: 'col7',
    },
    {
        Header: 'LOGIN',
        accessor: 'col8',
        Cell: UserVisiting,
    },
    {
        Header: 'AMOUNT',
        accessor: 'col9',
    },

    {
        Header: 'REQUESTED AT',
        accessor: 'col10',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col11',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col12',
        Cell: ActionController
    },

]

export { columnsInfo };