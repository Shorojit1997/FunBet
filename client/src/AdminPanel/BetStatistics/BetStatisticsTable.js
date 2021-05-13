// import EditOrDelete from './EditOrDelete'
// import ChangeOrHide from './ChangeOrHide'
// import Fisnished from './Fisnished'
import BetStatisticsHandeler from './BetStatisticsHandeler'

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
      Header: 'MATCH',
      accessor: 'col3',
    },
    {
      Header: 'QUESTION',
      accessor: 'col4',
    },
  
    {
      Header: 'ANSWER',
      accessor: 'col5',
    },
    {
      Header: 'REQUESTED_AT',
      accessor: 'col6',
    },
    {
      Header: 'AMOUNT(Bet)',
      accessor: 'col7',
    },
    {
      Header: 'RETURN_RATE',
      accessor: 'col8',
    },
   
    {
      Header: 'POSSIBLY_WIN',
      accessor: 'col9',
    }
    ,
    {
      Header: 'RETURN_AMOUNT',
      accessor: 'col10',
    },
    {
      Header: 'STATUS',
      accessor: 'col11',
    }
    ,
    {
      Header: 'ACTION_AT',
      accessor: 'col12',
      Cell:BetStatisticsHandeler
    }
  ]
export { columnsInfo };