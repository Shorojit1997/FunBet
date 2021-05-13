import { lazy } from 'react';
const Dashboards = lazy(() => import('../AdminPanel/Dashboard/Dashboards'))
const BetManagementMatch = lazy(() => import('../AdminPanel/BetManagement/BetManagementMatch'));
const BetManagementHidenMatch = lazy(() => import('../AdminPanel/BetManagement/BetManagementFinishedMatch'))
const Notification = lazy(() => import('../AdminPanel/Notifications/Notification'))
const BetStatistics = lazy(() => import('../AdminPanel/BetStatistics/BetStatistics'));
const UserAdmin = lazy(() => import('../AdminPanel/UserManagement/UserAdmin'))
const UserList = lazy(() => import('../AdminPanel/UserManagement/UserList'))
const FinaceDeposit = lazy(() => import('../AdminPanel/FinanceManagemet/FinanceDeposit'))
const FinanceWithdraw = lazy(() => import('../AdminPanel/FinanceManagemet/FinanceWithdraw'));
const FinanceTransfer = lazy(() => import('../AdminPanel/FinanceManagemet/FinanceTransfer'))
const FinancePayment = lazy(() => import('../AdminPanel/FinanceManagemet/FinancePayment'));
const FinanceSettings=lazy(()=>import('../AdminPanel/FinanceSettings/FinanceSettings'))
const Settings = lazy(() => import('../AdminPanel/Settings/Settings'))
const AdminAuthSignup = lazy(() => import('../AdminPanel/Pages/AdminSignup'));
const Autostack = lazy(() => import('../AdminPanel/Autostack/Autostack'))
const AutostackQuestion = lazy(() => import('../AdminPanel/Autostack/AutostackQuestion/AutostackQuestion'));
const QuestionList = lazy(() => import('../AdminPanel/BetManagement/AddQuestions/QuestionList'))
const GameController = lazy(() => import('../AdminPanel/Games/GameController'));
const WheelList = lazy(() => import('../AdminPanel/Games/Wheel/WheelList'))
const LudoList = lazy(() => import('../AdminPanel/Games/Ludo/LudoList'));
const CoinList = lazy(() => import('../AdminPanel/Games/CoinToss/CoinList'));
const EvenList = lazy(() => import('../AdminPanel/Games/EvenOdd/EvenList'));
const CardList = lazy(() => import('../AdminPanel/Games/CardPlay/CardList'));
const Promocode = lazy(() => import('../AdminPanel/Security/Promocode'));
const Gametype = lazy(() => import('../AdminPanel/Gametype/Gametype'));
const Clublist = lazy(() => import('../AdminPanel/Club/ClubList'));
const ReceiveMessage=lazy(()=>import('../AdminPanel/Club/ReceiveMessage/ReceiveMessage'));
const SendMessage =lazy(()=>import('../AdminPanel/Club/SendMessage/SendMessage'));


const routes = [
    {
        path: '/dashboard',
        handeler: Dashboards,
    },
    {
        path: '/bet/match',
        handeler: BetManagementMatch
    },
    {
        path: '/bet/finished_match',
        handeler: BetManagementHidenMatch
    },

    {
        path: '/bet/notification',
        handeler: Notification
    },
    {
        path: '/statistics',
        handeler: BetStatistics
    },
    {
        path: '/user/admin',
        handeler: UserAdmin
    },
    {
        path: '/user/list',
        handeler: UserList
    },
    {
        path: '/finance/deposit',
        handeler: FinaceDeposit
    },
    {
        path: '/finance/withdraw',
        handeler: FinanceWithdraw
    },
    {
        path: '/finance/transfer',
        handeler: FinanceTransfer
    },
    {
        path: '/finance/payment',
        handeler: FinancePayment
    },
    {
        path: '/finance/settings',
        handeler: FinanceSettings
    },
    {
        path: '/settings',
        handeler: Settings
    },
    {
        path: '/signup',
        handeler: AdminAuthSignup
    },
    {
        path: '/autostack',
        handeler: Autostack
    },
    {
        path: '/stackquestion/:slug',
        handeler: AutostackQuestion,
    },
    {
        path: '/bet/match/questions/:slug',
        handeler: QuestionList
    }
    ,
    {
        path: '/games/controller',
        handeler: GameController
    }
    ,
    {
        path: '/games/ludo',
        handeler: LudoList
    }
    ,
    {
        path: '/games/wheel',
        handeler: WheelList
    }
    ,
    {
        path: '/games/coin',
        handeler: CoinList
    }
    ,
    {
        path: '/games/even_odd',
        handeler: EvenList
    }
    ,
    {
        path: '/games/card',
        handeler: CardList
    }
    ,
    {
        path: '/security',
        handeler: Promocode
    }
    ,
    {
        path: '/bet/gametype',
        handeler: Gametype
    }
    ,
    {
        path: '/club/clublist',
        handeler: Clublist
    },
    {
        path: '/club/received_message',
        handeler: ReceiveMessage
    },
    {
        path: '/club/send_message',
        handeler: SendMessage
    },
    


]

export default routes;
