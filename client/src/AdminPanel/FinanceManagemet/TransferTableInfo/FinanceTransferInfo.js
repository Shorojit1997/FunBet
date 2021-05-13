import { AiFillDelete } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const {  transferPending, transferAccepted, transferRejected } = useSelector(state => state.adminTransfer, shallowEqual);
    const dispatch = useDispatch();

    // accepted deposit controler 
    const acceptedController = () => {
        const apiUrl = `/api/admin/transfers/accept/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (transferPending.length !== 0) {
                    let newTransferAccepted = [];
                    let newTransferPending = transferPending.filter((item, index) => {
                        if (item.col8 === cell.value) {
                            newTransferAccepted = [...transferAccepted, item];

                        }
                        return item.col8 !== cell.value;
                    })

                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending: newTransferPending,
                            transferAccepted: newTransferAccepted,
                            transferRejected
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
  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/transfers/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (transferPending.length !== 0) {
                    let newTransferRejected = [];
                    let newTransferPending = transferPending.filter((item, index) => {
                        if (item.col8 === cell.value) {
                            newTransferRejected = [...transferRejected, item];
                        }
                        return item.col8 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending: newTransferPending,
                            transferAccepted,
                            transferRejected: newTransferRejected
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
                if (transferPending.length !== 0) {
                   
                    let newTrasnferPending = transferPending.filter((item, index) => {
                        return item.col8 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending: newTrasnferPending,
                            transferAccepted,
                            transferRejected,
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
            {/* <button  className="btn btn-sm  btn-info m-1"><AiOutlineEdit /></button> */}
            <button onClick={rejectedController} className='btn btn-sm  btn-warning m-1'><GoDiffRemoved /></button>
            <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'><AiFillDelete /></button>
        </div>
    )
}
const columnsInfo = [
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

export { columnsInfo };