import React from 'react';
import { useTable, usePagination } from 'react-table'
// pages 
import TablePagination from './TablePagination'
// css

import { Table } from 'reactstrap';
const MakeTable = ({ columnsInfo, columnData, tableTitle }) => {
    // const columns = useMemo(() => columnsInfo, [columnsInfo]);
    // const data = useMemo(() => columnData, [columnData]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns:columnsInfo,
            data:columnData,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    return (
        <div className='bet_main ml-auto mr-auto'>
            <div className='bet_div'>
                <div className='bet_header'>{tableTitle}</div>
                <div className='w-100'>
                    <Table {...getTableProps()} hover={true} style={{ fontSize: '12px' }} striped>
                        <thead >
                            {
                                headerGroups.map(headerGroups => (
                                    <tr {...headerGroups.getHeaderGroupProps()}>
                                        {
                                            headerGroups.headers.map(column => (
                                                <th {...column.getHeaderProps()}>
                                                    {
                                                        column.render('Header')
                                                    }
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {!page.length ?<div className='card card-body w-100'>You have no entity</div>:null}
                    <div className='col-lg-12 row bet_footer'>
                        <div className='col-lg-6 col-12 text-left'>
                            Displaying page {pageIndex + 1} of {pageOptions.length} pages
                    </div>
                        <div className='col-lg-6 col-12 text-right'>
                            <TablePagination
                                canPreviousPage={canPreviousPage}
                                canNextPage={canNextPage}
                                pageOptions={pageOptions}
                                pageCount={pageCount}
                                gotoPage={gotoPage}
                                nextPage={nextPage}
                                previousPage={previousPage}
                                setPageSize={setPageSize}
                                pageIndex={pageIndex}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MakeTable);