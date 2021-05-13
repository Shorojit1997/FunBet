import React, {useEffect,useCallback } from 'react';
import { columnsInfo } from './TableInfo'
import MakeTable from '../../../Table/MakeTable'
import { transferActionHandeler } from '../../../Store/Actions/TransferAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'


const Transfer = () => {
    const dispatch = useDispatch();
    const { transferData } = useSelector(state => state.transfer, shallowEqual);
    const {user} =useSelector(state=>state.login,shallowEqual);

    const getData = useCallback(() => {
        dispatch(transferActionHandeler());
    },[dispatch])

    useEffect(() => {
        getData();
        // const interval = setInterval(() => {
        //     getData();
        // }, 30000)
        // return () => clearInterval(interval)

    }, [getData])
 
    return (
        <>
        {
            <MakeTable columnsInfo={columnsInfo} columnData={transferData} tableTitle={`Account transfer Statements of User ${user.authInformation.name}`} />
        }
    </>
    );
};

export default React.memo(Transfer);