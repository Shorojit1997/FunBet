const Dashboard = require('../../models/Dashboard');
const Withdraw=require('../../models/Withdraw');
const Transfer=require('../../models/Transfer');
const Deposit =require('../../models/Deposit')

const adminDashboardGetController = async (req, res, next) => {

    const dashboard = new Dashboard({
        info: 'Yes',
        totalUser: '0',
        totalUserBalance: '0',
        totalDeposit: '0',
        totalWithdraw: '0',
        clubCommision: '0',
        sponsorCommision: '0',
        totalCommision: '0',
        totalProfit: '0',
        totalGamebets: '0',
        adminProfit: '0',
        balance: '0',

    })
    try {
        const info = await Dashboard.findOne({ 'info': 'Yes' });
        const withdraw=await Withdraw.find({'accountStatus':"Pending"});
        const transfer=await Transfer.find({'accountStatus':"Pending"});
        const deposit=await Deposit.find({'accountStatus':"Pending"});
        
        if (!info) {
            await dashboard.save();
            return res.status(200).json({
                dashboard: dashboard,
                withdrawPeinding:withdraw.length
            })
        }
        res.status(200).json({
            dashboard:{
                info:info.info,
                totalUser: info.totalUser,
                totalUserBalance:info.totalUserBalance,
                totalDeposit:info.totalDeposit,
                totalWithdraw: info.totalWithdraw,
                clubCommision:info.clubCommision,
                sponsorCommision:info.sponsorCommision,
                totalCommision: info.totalCommision,
                totalProfit: info.totalProfit,
                totalGamebets:info.totalGamebets,
                adminProfit: info.adminProfit,
                balance: info.balance,
                _id:info._id,
                withdrawPending:withdraw.length,
                transferPending:transfer.length,
                depositPending:deposit.length
            }
           
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })
    }

}


module.exports = { adminDashboardGetController }
