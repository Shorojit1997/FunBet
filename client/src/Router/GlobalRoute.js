import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRouting from './PrivateRouting';

const AdminHomePage = lazy(() => import('./AdminHomePage'));
const ClubHomePage=lazy(()=>import('./ClubHomePage'))
const LocalRouting = lazy(() => import('./LocalRouting'));
const Ludo = lazy(() => import('../pages/Games/Ludo/Dise'));
const Wheel = lazy(() => import('../pages/Games/WheelFortune/Wheel'));
const CoinToss=lazy(()=>import('../pages/Games/CoinToss/CoinToss'));
const EvenOdd =lazy(()=>import('../pages/Games/EvenOdd/EvenOdd'));
const CardPlay =lazy(()=>import('../pages/Games/ThreeCard/CardPlay'))




const loading = (
    <div className="d-flex justify-content-center" style={{marginTop:'50px'}}>
        <div className="spinner-border  text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

const GlobalRoute = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={loading}>
                <Switch>

                    <PrivateRouting path='/games/ludo' component={Ludo} />
                    <PrivateRouting path='/games/wheel' component={Wheel} />
                    <PrivateRouting path='/games/coin_toss' component={CoinToss} />
                    <PrivateRouting path='/games/even_odd' component={EvenOdd} />
                    <PrivateRouting path='/games/card' component={CardPlay} />
                    <Route path='/admin' component={AdminHomePage} />
                    <Route path='/club' component={ClubHomePage} />
                    <Route  path='*' component={LocalRouting} />

                </Switch>
            </Suspense>

        </BrowserRouter>
    );
};

export default React.memo(GlobalRoute);