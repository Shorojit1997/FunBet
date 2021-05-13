import { AiFillDelete } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'

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
                if (depositRejected.length !== 0) {
                    let newDepositAccepted = [...depositAccepted];
                    let newdepositRejected = depositRejected.filter((item, index) => {
                        if (item.col10 === cell.value) {
                            newDepositAccepted.push(item);

                        }
                        return item.col10 !== cell.value;
                    })
                    
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending,
                            depositAccepted: newDepositAccepted,
                            depositRejected:newdepositRejected,
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
                if (depositRejected.length !== 0) {
                   
                    let newdepositRejected = depositRejected.filter((item, index) => {
                        return item.col10 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending,
                            depositAccepted,
                            depositRejected:newdepositRejected,
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
        Header: 'REQUESTED AT',
        accessor: 'col8',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col9',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col10',
        Cell: ActionController
    },

]

export { RejectedColumnsInfo };