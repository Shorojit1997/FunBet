import { AiFillDelete} from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const {withdrawPending, withdrawAccepted, withdrawRejected } = useSelector(state => state.adminWithdraw, shallowEqual);
    const dispatch = useDispatch();

    // accepted deposit controler 
    const acceptedController = () => {
        const apiUrl = `/api/admin/withdraws/accept/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (withdrawRejected.length !== 0) {
                    let newWithdrawAccepted = [...withdrawAccepted];
                    let newWithdrawRejected = withdrawRejected.filter((item, index) => {
                        if (item.col9 === cell.value) {
                            newWithdrawAccepted.push(item);

                        }
                        return item.col9 !== cell.value;
                    })
                    
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending,
                            withdrawAccepted: newWithdrawAccepted,
                            withdrawRejected:newWithdrawRejected,
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
                if (withdrawRejected.length !== 0) {
                   
                    let newWithdrawRejected = withdrawRejected.filter((item, index) => {
                        return item.col9 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending,
                            withdrawAccepted,
                            withdrawRejected:newWithdrawRejected,
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

export { RejectedColumnsInfo };