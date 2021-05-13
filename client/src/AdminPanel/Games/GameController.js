import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux'
import { adminLudoGetActionHandeler, adminWheelGetActionHandeler } from '../../Store/Actions/Admin/AdminGameBetAction'
import { adminCoinGetActionHandeler } from '../../Store/Actions/Admin/AdminCoinGameAction'
import { adminEvenOddGetActionHandeler } from '../../Store/Actions/Admin/AdminEvenOddGameAction';
import { adminCardGetActionHandeler } from '../../Store/Actions/Admin/AdminCardAction'
const CoinToss = lazy(() => import('./CoinToss'));
const Ludo = lazy(() => import('./Ludo.js'))
const Wheel = lazy(() => import('./Wheel.js'))
const EvenOdd = lazy(() => import('./EvenOdd.js'))
const CardPlay = lazy(() => import('./CardPlay'))

const GameController = () => {
    const dispatch = useDispatch();
    const callMethod = useCallback(() => {
        dispatch(adminLudoGetActionHandeler());
        dispatch(adminWheelGetActionHandeler());
        dispatch(adminCoinGetActionHandeler());
        dispatch(adminEvenOddGetActionHandeler())
        dispatch(adminCardGetActionHandeler())
    }, [dispatch])

    useEffect(() => {
        callMethod()
    }, [callMethod])

    return (
        <>
            <Suspense >
                {<Ludo />}
                {<Wheel />}
                {<CoinToss />}
                {<EvenOdd />}
                {<CardPlay />}

            </Suspense>
        </>
    );
};

export default React.memo(GameController);