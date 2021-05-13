
import { GoDiffRemoved } from 'react-icons/go'
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as Types from '../../../Store/Types'

const ActionController = ({ cell }) => {
    const { transferPending, transferAccepted, transferRejected } = useSelector(state => state.adminTransfer, shallowEqual);
    const dispatch = useDispatch();

  // rejected deposit info

    const rejectedController = () => {
        const apiUrl = `/api/admin/transfers/reject/${cell.value}`
        axios.post(apiUrl)
            .then(info => {
                if (transferAccepted.length !== 0) {
                    let newTrasnferRejected = [];
                    var newTrasnferAccepted = transferAccepted.filter((item) => {
                        if (item.col8 === cell.value) {
                            newTrasnferRejected = [...transferRejected, item];
                        }
                        return item.col8 !== cell.value;
                    })
                    dispatch({
                        type: Types.ADMIN_GET_TRANSFER_INFO, payload: {
                            transferPending,
                            transferAccepted:newTrasnferAccepted,
                            transferRejected: newTrasnferRejected
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

export { AcceptedColumnsInfo };