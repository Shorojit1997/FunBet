import React from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters } from 'react-table'
// pages 
import TablePagination from './TablePagination'
import SearchBar from '../SearchBar/SearchBar'
// css

import { Table } from 'reactstrap';
const MakeTable = ({ columnsInfo, columnData }) => {
    // const columns = columnsInfo;
    // const data = columnData;
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
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns:columnsInfo,
            data:columnData,
            initialState: { pageIndex: 0 },
        },

        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination,
    )
    return (
        <>
            <SearchBar setPageSize={setPageSize} setGlobalFilter={setGlobalFilter} />
            <div className='bet_main'>
                <div className='game_table_width'>
                    <div  className='w-100'>
                        <Table {...getTableProps()} hover={true} style={{ fontSize: '12px',width:'100%' }} striped bordered>
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
        </>
    );
};

export default MakeTable;