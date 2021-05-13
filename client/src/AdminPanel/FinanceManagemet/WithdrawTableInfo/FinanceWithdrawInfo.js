import { AiFillDelete} from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const { withdrawPending, withdrawAccepted, withdrawRejected } = useSelector(state => state.adminWithdraw, shallowEqual);
    const dispatch = useDispatch();

    // accepted deposit controler 
    const acceptedController = () => {
        const apiUrl = `/api/admin/withdraws/accept/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (withdrawPending.length !== 0) {
                    let newWithdrawAccepted = [];
                    let newWithdrawPending = withdrawPending.filter((item, index) => {
                        if (item.col9 === cell.value) {
                            newWithdrawAccepted = [...withdrawAccepted, item];

                        }
                        return item.col9 !== cell.value;
                    })
                  
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending: newWithdrawPending,
                            withdrawAccepted: newWithdrawAccepted,
                            withdrawRejected
                        }
                    })
                }

            })
            .catch(error => {
                return  dispatch({ type: Types.GET_WITHDRAW_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/withdraws/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (withdrawPending.length !== 0) {
                    let newWithdrawRejected = [];
                    let newWithdrawPending = withdrawPending.filter((item, index) => {
                        if (item.col9 === cell.value) {
                            newWithdrawRejected = [...withdrawRejected, item];

                        }
                        return item.col9 !== cell.value;
                    })
                    console.log(withdrawPending.length,'    ',newWithdrawPending.length);
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending: newWithdrawPending,
                            withdrawAccepted,
                            withdrawRejected: newWithdrawRejected
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_WITHDRAW_INFO_ERROR, payload:{
                    flashMessage:error.response.data.flashMessage
                } })
            })
    }
    const deleteController = () => {
        const apiUrl = `/api/admin/withdraws/delete/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (withdrawPending.length !== 0) {
                   
                    let newWithdraPending = withdrawPending.filter((item, index) => {
                        return item.col9 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending: newWithdraPending,
                            withdrawAccepted,
                            withdrawRejected,
                        }
                    })
                }
            })
            .catch(error => {
                return  dispatch({ type: Types.ADMIN_GET_WITHDRAW_INFO_ERROR, payload:{
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
        Header: 'ACCOUNT TYPE',
        accessor: 'col4',
    },
    {
        Header: 'TO',
        accessor: 'col5',
    },

    {
        Header: 'AMOUNT',
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