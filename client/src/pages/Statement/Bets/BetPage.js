import React, { useEffect,useCallback } from 'react';
import { columnsInfo } from './TableInfo'
import MakeTable from '../../../Table/MakeTable'
import { placeBetsActionHandeler } from '../../../Store/Actions/PlaceBetsAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'


const BetPage = () => {
    const dispatch = useDispatch();
    const { placeBetsData } = useSelector(state => state.placebets, shallowEqual);
    const { user } = useSelector(state => state.login, shallowEqual);

    const getData = useCallback(() => {
        dispatch(placeBetsActionHandeler());
    },[dispatch])

    useEffect(() => {
        getData();
    }, [getData])

    return (
        <>
            {
                    <MakeTable columnsInfo={columnsInfo} columnData={placeBetsData} tableTitle={`Bets Staments of User ${user.authInformation.name}`} />
                   
            }
        </>

    );
};

export default React.memo(BetPage);