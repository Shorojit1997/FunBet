const Withdraw = require('../../models/Withdraw');
const Dashboard = require('../../models/Dashboard')
const User = require('../../models/User')
const Club = require('../../models/Clubinfo')
var mongoose = require('mongoose');

const adminWithdrawGetController = async (req, res, next) => {
    try {

        const withdrawPending = await Withdraw.find({ accountStatus: 'Pending' }).limit(100).sort({ '_id': -1 })
        const withdrawAccepted = await Withdraw.find({ accountStatus: 'Accepted' }).limit(100).sort({ '_id': -1 })
        const withdrawRejected = await Withdraw.find({ accountStatus: 'Rejected' }).limit(100).sort({ '_id': -1 })
        return res.status(201).json({
            withdrawPending,
            withdrawAccepted,
            withdrawRejected
        })
    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }

}
//accepted controlelr 
const adminWithdrawAcceptPostController = async (req, res, next) => {
    const withdrawId = req.params.slug
    if (!withdrawId) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
    try {
        let userWithdraw = await Withdraw.findById({ _id: withdrawId })
        let user;
        let isClub = false
        user = await User.findById(userWithdraw.userId);
        if (!user) {
            user = await Club.findById(userWithdraw.userId);
            isClub = true
        }
        let dashboard = await Dashboard.findOne({ 'info': 'Yes' })

        if (userWithdraw.accountStatus === 'Pending' || userWithdraw.accountStatus === 'Rejected') {
            //send to 
            user.amount = parseFloat(user.amount, 10) - parseFloat(userWithdraw.amount, 10);
            dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance, 10) - parseFloat(userWithdraw.amount, 10));
            dashboard.totalWithdraw = JSON.stringify(parseFloat(dashboard.totalWithdraw, 10) + parseFloat(userWithdraw.amount, 10));
            if (isClub)
                user.totalWithdraw = JSON.stringify(parseFloat(user.totalWithdraw, 10) + parseFloat(userWithdraw.amount, 10));
            userWithdraw.accountStatus = "Accepted";
            await user.save();
            await userWithdraw.save();
            await dashboard.save();
        }
        return res.status(200).json({
            flashMessage: `Trasnfer successfull for ${user.name}`
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

//rejected controlelr
const adminWithdrawRejectPostController = async (req, res, next) => {
    const withdrawId = req.params.slug
    try {

        let userWithdraw = await Withdraw.findByIdAndUpdate({ _id: withdrawId })
        let dashboard = await Dashboard.findOne({ 'info': 'Yes' })
        let user;
        let isClub = false
        user = await User.findById(userWithdraw.userId);
        if (!user) {
            user = await Club.findById(userWithdraw.userId);
            isClub = true;
        }
        //if status accepted.
        if (userWithdraw.accountStatus === 'Accepted') {

            user.amount = parseFloat(user.amount, 10) + parseFloat(userWithdraw.amount, 10);
            dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance, 10) + parseFloat(userWithdraw.amount, 10));
            dashboard.totalWithdraw = JSON.stringify(parseFloat(dashboard.totalWithdraw, 10) - parseFloat(userWithdraw.amount, 10));
            if (isClub)
                user.totalWithdraw = JSON.stringify(parseFloat(user.totalWithdraw, 10) - parseFloat(userWithdraw.amount, 10));
            userWithdraw.accountStatus = "Rejected";
            await dashboard.save();
            await user.save();
            await userWithdraw.save();
        }
        //if status pending
        else if (userWithdraw.accountStatus === 'Pending') {
            userWithdraw.accountStatus = "Rejected";

            await userWithdraw.save();
            await user.save();
        }
        return res.status(200).json({
            flashMessage: "Successfully rejected wrong account transactions."
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

//deleted controller 
const adminWithdrawDeletePostController = async (req, res, next) => {
    const withdrawId = req.params.slug
    try {
        const userWithdraw = await Withdraw.findByIdAndDelete({ _id: withdrawId });

        let user;
        user = await User.findById(userWithdraw.userId);
        if (!user) {
            user = await Club.findById(userWithdraw.userId);
        }

        if (Object.keys(userWithdraw).length !== 0) {
            user.withdraw.pull(withdrawId);

            await user.save();
        }
        return res.status(200).json({
            flashMessage: `Transfer delete successfull for ${user.username}`
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}





module.exports = {
    adminWithdrawGetController,
    adminWithdrawAcceptPostController,
    adminWithdrawRejectPostController,
    adminWithdrawDeletePostController

}