import {combineReducers} from 'redux'
import LoginReducer from './Reducer/LoginReducer'
import RegisterReducer from './Reducer/RegisterReducer';
import MatchReducer from './Reducer/MatchReduces'
import QuestionReducer from './Reducer/QuestionReducer'
import GameTypeReducer from './Reducer/GameTypeReducer'
import DepositReducer from './Reducer/DepositReducer'
import TransferReducer from './Reducer/TransferReducer'
import WithdrawReducer from './Reducer/WithdrawReducer'
import PlaceBetsReducer from './Reducer/PlaceBetsReducer'
import PictureReducer from './Reducer/PictureReducer'

import AdminLoginReducer from './Reducer/Admin/AdminLoginReducer'
import AdminRegisterReducer from './Reducer/Admin/AdminRegisterReducer';
import AdminDepositReducer from './Reducer/Admin/AdminDepositReducer'
import AdminTransferReducer from './Reducer/Admin/AdminTransferReducer'
import AdminWithdrawReducer from './Reducer/Admin/AdminWithdrawReducer'
import AdminAccountTypeReducer from './Reducer/Admin/AdminAccountTypeReducer'
import AdminListReducer from './Reducer/Admin/AdminListReuder'
import AdminUserListReducer from './Reducer/Admin/AdminUserListReducer'
import AdminStacknameReducer from './Reducer/Admin/AdminStacknameReducer'
import AdminStackReducer from './Reducer/Admin/AdminAutostackReducer'
import AdminBetsReducer from './Reducer/Admin/AdminBetsReducer'
import AdminPlaceBetsReducer from './Reducer/Admin/AdminPlaceBetsReducer'
import AdminSettingsReducer from './Reducer/Admin/AdminSettingsReducer'
import AdminDashboardReducer from './Reducer/Admin/AdminDashboardReducer'
import AdminGameReducer from './Reducer/Admin/AdminGameBetReducer'
import GameInfoReducer from './Reducer/GameInfoReducer'
import GameBetsReducer from './Reducer/GameBetsReducer'
import GameWheelInfoReducer from './Reducer/GameInfoWheelReducer';
import AdminCoinGameReducer from './Reducer/Admin/AdminCoinGameReducer';
import AdminEvenOddGameReducer from './Reducer/Admin/AdminEvenOddReducer';
import AdminCardGameReducer from './Reducer/Admin/AdminCardReducer'
import GameCoinInfoReducer from './Reducer/GameInfoCoinReducer';
import GameEvenInfoReducer from './Reducer/GemeInfoEvenReducer';
import GameCardInfoReducer from './Reducer/GameInfoCardReducer';
import AdminPromocodeReducer from './Reducer/Admin/AdminPromocodeReducer';
import AdminNotificationsReducer from './Reducer/Admin/AdminNotificationReducer';
import NotificationsReducer from './Reducer/NotificationReducer';
import ClubLoginReducer from './Reducer/Club/ClubLoginReducer'
import ClubListReducer from './Reducer/ClubListReducer'
import ClubMemberReducer from './Reducer/Club/ClubMemberReducer';
import clubWithdrawReducer from './Reducer/Club/WithdrawReducer';
import AdminClubListReducer from './Reducer/Club/AdminClubListReducer';
import ClubMessageReducer from './Reducer/Club/ClubMessageReducer';
import AdminClubMessageReducer from './Reducer/Club/AdminClubMessageReducer';
import ClubDashboardReducer from './Reducer/Club/ClubDashboardReducer';
import AdminFinanceReducer from './Reducer/Admin/AdminFinanceReducer'


const  rootReducer=combineReducers({
    clubLogin:ClubLoginReducer,
    clubList:ClubListReducer,
    clubMember:ClubMemberReducer,
    clubWithdraw:clubWithdrawReducer,
    clubMessage:ClubMessageReducer,
    adminClublist:AdminClubListReducer,
    adminClubMessage:AdminClubMessageReducer,
    clubDashboard:ClubDashboardReducer,
    finance:AdminFinanceReducer,

    // admin reduer 
    adminLogin:AdminLoginReducer,
    adminRegister:AdminRegisterReducer,
    adminDeposit:AdminDepositReducer,
    adminTransfer:AdminTransferReducer,
    adminWithdraw:AdminWithdrawReducer,
    adminAccountType:AdminAccountTypeReducer,
    adminList:AdminListReducer,
    userList:AdminUserListReducer,
    adminStackName:AdminStacknameReducer,
    adminStack:AdminStackReducer,
    adminBets:AdminBetsReducer,
    adminPlaceBets:AdminPlaceBetsReducer,
    settings:AdminSettingsReducer,
    adminDashboard:AdminDashboardReducer,
    adminGame:AdminGameReducer,
    adminCoin:AdminCoinGameReducer,
    adminEven:AdminEvenOddGameReducer,
    adminCard:AdminCardGameReducer,
    adminNotification:AdminNotificationsReducer,
    gameInfo:GameInfoReducer,
    gameBets:GameBetsReducer,
    wheel:GameWheelInfoReducer,
    coin:GameCoinInfoReducer,
    even:GameEvenInfoReducer,
    card:GameCardInfoReducer,
    promocode:AdminPromocodeReducer,
    notifications:NotificationsReducer,

    //user reducer
    pictures:PictureReducer,
    bets:MatchReducer,
    login:LoginReducer,
    register:RegisterReducer,
    question:QuestionReducer,
    gameType:GameTypeReducer,
    deposit:DepositReducer,
    transfer:TransferReducer,
    withdraw:WithdrawReducer,
    placebets:PlaceBetsReducer,

    
})
export default rootReducer;