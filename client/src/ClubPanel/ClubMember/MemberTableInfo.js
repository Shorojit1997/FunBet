import {useHistory} from 'react-router-dom'
const ActionController=({cell})=>{
    const history=useHistory()
    return(
        <button onClick={()=>{history.push(`/club/members/${cell.value}`)}} className='btn btn-sm btn-warning'>Bet History</button>
    )
}

const columnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'NAME',
        accessor: 'col2',
    },
    {
        Header: 'USERNAME',
        accessor: 'col3',
    },

    {
        Header: 'EMAIL',
        accessor: 'col4',
    },
    {
        Header: 'AMOUNT',
        accessor: 'col5',
    },
    {
        Header: 'ACTION AT',
        accessor: 'col6',
        Cell: ActionController
    },

    {
        Header: 'REQUESTED AT',
        accessor: 'col7',
    }
    ,
    {
        Header: 'STATUS',
        accessor: 'col8',
    }

]

export { columnsInfo };