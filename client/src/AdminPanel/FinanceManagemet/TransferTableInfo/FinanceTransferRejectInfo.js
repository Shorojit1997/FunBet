import { AiFillDelete } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const { transferPending, transferAccepted, transferRejected } = useSelector(state => state.adminTransfer, shallowEqual);
    const dispatch = useDispatch();

    // accepted deposit controler 
    const acceptedController = () => {
        const apiUrl = `/api/admin/transfers/accept/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (transferRejected.length !== 0) {
                    let newTransferAccepted = [...transferAccepted];

                    let newTransferRejected = transferRejected.filter((item, index) => {
                        if (item.col8 === cell.value) {
                            newTransferAccepted.push(item);

                        }
                        return item.col8 !== cell.value;
                    })
                    
                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending,
                            transferAccepted: newTransferAccepted,
                            transferRejected:newTransferRejected,
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_TRANSFER_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
  

    const deleteController = () => {
        const apiUrl = `/api/admin/transfers/delete/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (transferRejected.length !== 0) {
                   
                    let newTransferRejected = transferRejected.filter((item, index) => {
                        return item.col8 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending,
                            transferAccepted,
                            transferRejected:newTransferRejected,
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_TRANSFER_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }

    return (
        <div className='table_action ml-auto mr-auto'>
            <button onClick={acceptedController} className='btn btn-sm  btn-success m-1' ><GiReceiveMoney /></button>
            <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'><AiFillDelete /></button>
        </div>
    )
}
const RejectedColumnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'USERNAME',
        accessor: 'col2',
    },
    {
        Header: 'TO',
        accessor: 'col3',
    },
    {
        Header: 'FROM',
        accessor: 'col4',
    },
    {
        Header: 'AMOUNT',
        accessor: 'col5',
    },
    {
        Header: 'REQUESTED_AT',
        accessor: 'col6',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col7',
    },
    {
        Header: 'ACTION_AT',
        accessor: 'col8',
        Cell: ActionController
    },

]

export { RejectedColumnsInfo };