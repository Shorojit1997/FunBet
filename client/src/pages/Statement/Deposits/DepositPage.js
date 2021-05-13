import React, { useEffect,useCallback,lazy } from 'react';
import { columnsInfo } from './TableInfo'
// import MakeTable from '../../../Table/MakeTable'
import { depositActionHandeler } from '../../../Store/Actions/DepositAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

const MakeTable =lazy(()=>import('../../../Table/MakeTable'))


const DepositPage = () => {

    const dispatch = useDispatch();
    const { depositData } = useSelector(state => state.deposit, shallowEqual);
    const { user } = useSelector(state => state.login, shallowEqual);

    const getData = useCallback(() => {
        dispatch(depositActionHandeler());
    },[dispatch])

    useEffect(() => {
        getData();
    }, [getData])
 
    return (
        <>
            {
                <MakeTable columnsInfo={columnsInfo} columnData={depositData} tableTitle={`Deposit Staments of User ${user.authInformation.name}`} />
           }
        </>

    );
};

export default React.memo(DepositPage);