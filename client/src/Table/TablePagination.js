import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
const TablePagination = (props) => {
    const { canPreviousPage, canNextPage, gotoPage, nextPage, previousPage,pageIndex,} = props;
    return (
        <Pagination aria-label="Page navigation example">

            <PaginationItem>
                <PaginationLink first onClick={() => gotoPage(pageIndex - 3)} disabled={!canPreviousPage} />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink previous onClick={() => previousPage()} disabled={!canPreviousPage} />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink onClick={()=>{gotoPage(pageIndex)}}>
                    {pageIndex+1}
                 </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>{gotoPage(pageIndex+1)}}>
                   {pageIndex+2}
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>{gotoPage(pageIndex+2)}}>
                {pageIndex+3}
                </PaginationLink>
            </PaginationItem>
           
            <PaginationItem>
                <PaginationLink next onClick={() => nextPage()} disabled={!canNextPage} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last onClick={() => gotoPage(pageIndex + 3)} disabled={!canNextPage} />
            </PaginationItem>
        </Pagination>
    );
};

export default TablePagination;