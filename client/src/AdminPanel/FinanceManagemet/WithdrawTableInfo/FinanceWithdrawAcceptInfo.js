
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
   const {withdrawPending, withdrawAccepted, withdrawRejected } = useSelector(state => state.adminWithdraw, shallowEqual);
    const dispatch = useDispatch();

  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/withdraws/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (withdrawAccepted.length !== 0) {
                    let newithdrawRejected = [];
                    var newWithdrawAccepted = withdrawAccepted.filter((item) => {
                        if (item.col9 === cell.value) {
                            newithdrawRejected = [...withdrawRejected, item];
                        }
                        return item.col9 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_WITHDRAW_INFO, payload: {
                            withdrawPending,
                            withdrawAccepted:newWithdrawAccepted,
                            withdrawRejected: newithdrawRejected
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

export { AcceptedColumnsInfo };