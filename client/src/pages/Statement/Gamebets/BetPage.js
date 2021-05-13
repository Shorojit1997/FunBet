import React, { useEffect } from 'react';
import { GameBetListActionHandeler } from '../../../Store/Actions/GameBetsAction'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { columnsInfo } from './TableInfo'
import MakeTable from '../../../Table/MakeTable'


const LudoList = () => {

    const dispatch = useDispatch();
    const { gameBets } = useSelector(state => state.gameBets, shallowEqual)
    const { user } = useSelector(state => state.login, shallowEqual)

    useEffect(() => {
        dispatch(GameBetListActionHandeler());
    }, [dispatch])

    return (
        <>
            {
                    <MakeTable columnsInfo={columnsInfo} columnData={gameBets} tableTitle={`Games Staments of User ${user.authInformation.name}`} />
            }
        </>

    );
};

export default React.memo(LudoList);