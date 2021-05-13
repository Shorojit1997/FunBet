
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const { depositPending, depositAccepted, depositRejected } = useSelector(state => state.adminDeposit, shallowEqual);
    const dispatch = useDispatch();

  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/deposits/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (depositAccepted.length !== 0) {
                    let newDepositRejected = [];
                    var newdepositAccepted = depositAccepted.filter((item) => {
                        if (item.col10 === cell.value) {
                            newDepositRejected = [...depositRejected, item];
                        }
                        return item.col10 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
                            depositPending,
                            depositAccepted:newdepositAccepted,
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

    // const deleteController = () => {
    //     const apiUrl = `/api/admin/deposits/delete/${cell.value}`
    //     axios.post(apiUrl)
    //         .then(info => {
    //             if (depositAccepted.length !== 0) {
                   
    //                 let newdepositAccepted = depositAccepted.filter((item, index) => {
    //                     return item.col10 !== cell.value;
    //                 })
    //                 dispatch({
    //                     type: Types.ADMIN_GET_DEPOSIT_INFO, payload: {
    //                         depositPending,
    //                         depositAccepted:newdepositAccepted,
    //                         depositRejected,
    //                     }
    //                 })
    //             }
    //         })
    // }

    return (
        <div className='table_action ml-auto mr-auto'>
            <button onClick={rejectedController} className='btn btn-sm  btn-warning m-1'><GoDiffRemoved /></button>
            {/* <button onClick={deleteController} className='btn btn-sm  btn-danger m-1'><AiFillDelete /></button> */}
        </div>
    )
}
const AcceptedColumnsInfo = [
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

export { AcceptedColumnsInfo };