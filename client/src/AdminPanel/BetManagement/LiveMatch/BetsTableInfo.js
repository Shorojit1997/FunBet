import EditOrDelete from './EditOrDelete'
import ChangeOrHide from './ChangeOrHide'
import Fisnished from './Fisnished'
import BettingOptions from './BettingOptions'

const columnsInfo = [
    {
        Header: 'SL',
        accessor: 'col1',
    },
    {
        Header: 'GAME_TYPE',
        accessor: 'col2',
    },
    {
        Header: 'TEAMA',
        accessor: 'col3',
    },

    {
        Header: 'TEAMB',
        accessor: 'col4',
    },
    {
        Header: 'TURNAMENT_NAME',
        accessor: 'col5',
    },
    {
        Header: 'DAY',
        accessor: 'col6',
    },
    {
        Header: 'TIME',
        accessor: 'col7',
    },
    {
        Header: 'SCORE',
        accessor: 'col8',
    },
    {
        Header: 'BETTING_OPTIONS',
        accessor: 'col9',
        Cell:BettingOptions,
    },
    {
        Header: 'STATUS',
        accessor: 'col10',
    },
    {
        Header: 'ACTION',
        accessor: 'col11',
        Cell: Fisnished
    },
    {
        Header: 'ACTION',
        accessor: 'col12',
        Cell: ChangeOrHide
    },
    {
        Header: 'ACTION',
        accessor: 'col13',
        Cell: EditOrDelete
    },
]

export { columnsInfo };