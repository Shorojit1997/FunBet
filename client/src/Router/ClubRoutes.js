
import  { lazy } from 'react';
const Sendmessage=lazy(()=>import('../ClubPanel/Message/SendMessage'));
const Receivemessage=lazy(()=>import('../ClubPanel/Message/ReceiveMessage'))
const Dashboards = lazy(() => import('../ClubPanel/Dashboard/Dashboards'));
const Member=lazy(()=>import('../ClubPanel/ClubMember/Member'));
const MemberHistory =lazy(()=>import('../ClubPanel/ClubMember/MemberHistory'));
const Withdraw=lazy(()=>import('../ClubPanel/Withdraw/Withdraw'));
const WithdraList=lazy(()=>import('../ClubPanel/Withdraw/WithdrawList'));



const routes=[
    {
        path:'/dashboard',
        handeler:Dashboards,
    },
    {
        path:'/members',
        handeler:Member,
    },
    {
        path:'/members/:slug',
        handeler:MemberHistory,
    },
    {
        path:'/withdraws',
        handeler:Withdraw,
    },
    {
        path:'/withdraws_list',
        handeler:WithdraList,
    },
    {
        path:'/message/send',
        handeler:  Sendmessage
    }
 
    ,
    {
        path:'/message/received',
        handeler:  Receivemessage
    }
]

export default routes;