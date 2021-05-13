import React, { useEffect,useCallback } from 'react';
import { columnsInfo } from './TableInfo'
import MakeTable from '../../../Table/MakeTable'
import { withdrawActionHandeler } from '../../../Store/Actions/WithdrawAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'


const WithdrawPage = () => {
    const dispatch = useDispatch();
    const {withdrawData } = useSelector(state => state.withdraw, shallowEqual);
    const { user } = useSelector(state => state.login, shallowEqual);

    const getData = useCallback(() => {
        dispatch(withdrawActionHandeler());
    },[dispatch])

    useEffect(() => {
        getData();
    }, [getData])
   
    return (
        <>
            {
                <MakeTable columnsInfo={columnsInfo} columnData={withdrawData} tableTitle={`Withdraws Statements of User ${user.authInformation.name}`} />
           
            }
        </>
    );
};

export default React.memo(WithdrawPage);