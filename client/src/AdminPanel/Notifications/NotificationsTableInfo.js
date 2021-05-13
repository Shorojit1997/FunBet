import axios from 'axios'
import {useState} from 'react'
import { adminNotificationsAction } from '../../Store/Actions/Admin/AdminNotificationAction';
import { useDispatch } from 'react-redux';
import View from './View'
import EditNotificationModal from './EditNotificationModal'
const NotifyAction = ({ cell }) => {
 
    const[modal,setModal]=useState(false)
    const[modal1,setModal1]=useState(false)
    const dispatch = useDispatch();
    const { _id,title,description } = cell.value;

    const deleteController = () => {
        axios.delete(`/api/admin/notifications/${_id}`)
            .then((info) => {
                dispatch(adminNotificationsAction())
            })
            .catch(e => { })
    }
    return (
        <div>
             {
                modal && <View 
                  modal={modal}
                  setModal={setModal}
                  title={title}
                  description={description}
                />
            } 
             {
                modal1 &&
                 <EditNotificationModal 
                  modal={modal1}
                  setModal={setModal1}
                  title={title}
                  description={description}
                  _id={_id}
                />
            } 
            <button  onClick={()=>setModal(true)} className='btn btn-sm m-1 btn-success'>View</button>
            <button onClick={()=>setModal1(true)} className='btn btn-sm m-1 btn-info'>edit</button>
            <button onClick={deleteController} className='btn btn-sm m-1 btn-danger'>Delete</button>
        </div>
    )
}

const columnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'TITLE',
        accessor: 'col2',
    },
    {
        Header: 'CREATED_AT',
        accessor: 'col3',
    },
    {
        Header: 'ACTION_AT',
        accessor: 'col4',
        Cell: NotifyAction
    },
]

export { columnsInfo };