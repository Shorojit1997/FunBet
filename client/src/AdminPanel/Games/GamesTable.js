import React from 'react';
// pages 

// css

import { Table } from 'reactstrap';
import DashboardPagination from '../Dashboard/DashboardPagination';
import {AiFillDelete,AiOutlineEdit,AiFillLock} from 'react-icons/ai'

const GamesTable = () => {
    return (
        <div className='bet_main'>
            <div className='game_table_width'>
                {/* <div className='bet_header'>Deposits Staments of User Sagor Sarkar</div> */}
                <Table hover={true} style={{ fontSize: '12px' }} bordered>
                    <thead >
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Jacob</td>
                            <td>
                                <div  className='table_action ml-auto mr-auto'>
                                    <button className='btn btn-sm btn-warning m-1'><AiFillLock/></button>
                                    <button className='btn btn-sm  btn-success m-1'><AiOutlineEdit/></button>
                                    <button className='btn btn-sm  btn-danger m-1'><AiFillDelete/></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Jacob</td>
                            <td>
                                <div  className='table_action ml-auto mr-auto'>
                                    <button className='btn btn-sm  btn-warning m-1'><AiFillLock/></button>
                                    <button className='btn btn-sm  btn-success m-1'><AiOutlineEdit/></button>
                                    <button className='btn btn-sm  btn-danger m-1'><AiFillDelete/></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className='row'>
                    <div className='col-lg-6 col-12 text-left'>
                        Displaying 0 - 0 of 0 records
                    </div>
                    <div className='col-lg-6 col-12 text-right'>
                        <DashboardPagination />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GamesTable;