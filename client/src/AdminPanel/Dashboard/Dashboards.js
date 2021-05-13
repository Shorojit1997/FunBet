import React,{useEffect} from 'react';
import DashboardItem from './DashboardItem';
import DashbordHeader from './DashbordHeader';
import {AiOutlineUser,AiFillDollarCircle} from 'react-icons/ai'
import{RiLuggageDepositFill} from 'react-icons/ri'
import {FcFeedback} from 'react-icons/fc'
import {FaCcDinersClub,FaGamepad} from 'react-icons/fa'
import {DiResponsive} from 'react-icons/di'
import{GiProfit} from 'react-icons/gi'
import {adminDashboardAction} from '../../Store/Actions/Admin/AdminDashboardAction'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'


const Dashboards = () => {
    const dispatch = useDispatch()
    const {dashboard} = useSelector(state => state.adminDashboard,shallowEqual)
    const itemInfo=[
        {
            symbol:<AiOutlineUser/>,
            name:'Total User',
            number:dashboard.totalUser,
            color:'rgba(102,88,221,.25)'
        },
        {
            symbol:<AiFillDollarCircle/>,
            name:'Total user balance',
            number:`৳${parseInt(dashboard.totalUserBalance)}`,
            color:'rgba(26,188,156,.25)'
        },
        {
            symbol:<RiLuggageDepositFill/>,
            name:'Total Deposit',
            number:`৳${parseInt(dashboard.totalDeposit)}`,
            color:'rgba(246,114,167,.25)'
        },
        {
            symbol:<FcFeedback/>,
            name:'Total withdrawal',
            number:`৳${parseInt(dashboard.totalWithdraw)}`,
            color:'rgba(102,88,221,.25)'
        },
        {
            symbol:<FaCcDinersClub/>,
            name:'Club Commission',
            number:`৳${parseInt(dashboard.clubCommision)}`,
            color:'rgba(26,188,156,.25)'
        },
        {
            symbol:<DiResponsive/>,
            name:'Sponsor Commission',
            number:`৳${parseInt(dashboard.sponsorCommision)}`,
            color:'rgba(246,114,167,.25)'
        },
        {
            symbol:'$',
            name:'Total Commission',
            number:`৳${parseInt(dashboard.totalCommision)}`,
            color:'rgba(102,88,221,.25)'
        },
        {
            symbol:<GiProfit/>,
            name:'Profit',
            number:`৳${parseInt(dashboard.totalProfit)}`,
            color:'rgba(26,188,156,.25)'
        },
        {
            symbol:<FaGamepad/>,
            name:'Total Game Bets',
            number:`৳${parseInt(dashboard.totalGamebets)}`,
            color:'rgba(26,188,156,.25)'
        },
        {
            symbol:'$',
            name:'Net Balance',
            number:`৳${parseInt(dashboard.balance)}`,
            color:'rgba(246,114,167,.25)'
        },
    ]
    useEffect(() => {
      dispatch(adminDashboardAction())
    }, [dispatch])
    return (
        <div className='dashboard'>
           <DashbordHeader headerTitle='Dashboard'/>
            <div className='row my-auto'>
                {
                  itemInfo.map((item,index)=>{
                        return  <DashboardItem key={index}  itemData={item}/>
                    })
                }
               
            </div>
        </div>
    );
};

export default Dashboards;