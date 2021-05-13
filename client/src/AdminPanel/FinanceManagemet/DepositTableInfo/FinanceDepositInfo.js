import { AiFillDelete } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const { depositPending, depositAccepted, depositRejected } = useSelector(state => state.adminDeposit, shallowEqual);
    const dispatch = useDispatch();

    // accepted deposit controler 
    const acceptedController = () => {
        const apiUrl = `/api/admin/deposits/accept/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (depositPending.length !== 0) {
                    let newDepositAccepted = [];
                    let newDepositPending = depositPending.filter((item, index) => {
                        if (item.col10 === cell.value) {
                            newDepositAccepted = [...depositAccepted, item];

                        }
                        return item.col10 !== cell.value;
                    })
                    console.log(depositPending.length ,"     ",newDepositPending.length);
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending: newDepositPending,
                            depositAccepted: newDepositAccepted,
                            depositRejected
                        }
                    })
                }

            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/deposits/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (depositPending.length !== 0) {
                    let newDepositRejected = [];
                    let newDepositPending = depositPending.filter((item, index) => {
                        if (item.col10 === cell.value) {
                            newDepositRejected = [...depositRejected, item];

                        }
                        return item.col10 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending: newDepositPending,
                            depositAccepted,
                            depositRejected: newDepositRejected
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
    const deleteController = () => {
        const apiUrl = `/api/admin/deposits/delete/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (depositPending.length !== 0) {
                   
                    let newDepositPending = depositPending.filter((item, index) => {
                        return item.col10 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending: newDepositPending,
                            depositAccepted,
                            depositRejected,
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_DEPOSIT_INFO_ERROR, payload:{
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
        Header: 'METHOD',
        accessor: 'col3',
    },
    {
        Header: 'TO',
        accessor: 'col4',
    },


    {
        Header: 'FROM',
        accessor: 'col5',
    },
    {
        Header: 'AMOUNT',
        accessor: 'col6',
    },
    {
        Header: 'TXN ID',
        accessor: 'col7',
    },
    {
        Header: 'REQUESTED_AT',
        accessor: 'col8',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col9',
    },
    {
        Header: 'ACTION_AT',
        accessor: 'col10',
        Cell: ActionController
    },

]

export { columnsInfo };