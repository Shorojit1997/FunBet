const Deposit = require('../../models/Deposit')
const User = require('../../models/User')
const Dashboard=require('../../models/Dashboard')
var mongoose = require('mongoose');

const adminDepositGetController = async (req, res, next) => {
    try {

        const depositPending = await Deposit.find({ accountStatus: 'Pending' }).limit(200).sort({'_id':-1}).lean()
        const depositAccepted = await Deposit.find({ accountStatus: 'Accepted' }).limit(200).sort({'_id':-1}).lean()
        const depositRejected = await Deposit.find({ accountStatus: 'Rejected' }).limit(200).sort({'_id':-1}).lean()
        return res.status(201).json({
            depositPending,
            depositAccepted,
            depositRejected
        })
    }
    catch (e) {
        return res.status(401).json({
            error: 'Please try again..',
        })
    }

}
//accepted controlelr 
const adminDepositPostController = async (req, res, next) => {
    const depositId = req.params.slug
    try {
        let userDeposit = await Deposit.findById({ _id: depositId })
        let dashboard=await Dashboard.findOne({'info':'Yes'})
        let user = await User.findById(userDeposit.userId)

        if (userDeposit.accountStatus === 'Pending' || userDeposit.accountStatus === 'Rejected') {
            user.amount = parseFloat(user.amount, 10) + parseFloat(userDeposit.amount, 10);
            dashboard.totalUserBalance=JSON.stringify(parseFloat(dashboard.totalUserBalance,10)+parseFloat(userDeposit.amount,10));
            dashboard.totalDeposit=JSON.stringify(parseFloat(dashboard.totalDeposit,10)+parseFloat(userDeposit.amount,10));
            userDeposit.accountStatus = 'Accepted'
            await user.save();
            await dashboard.save();
            await userDeposit.save();
        }
        return res.status(200).json({
            flashMessage: `Deposit successfull for ${user.name}`
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

//rejected controlelr
const adminRejectedDepositPostController = async (req, res, next) => {
    const depositId = req.params.slug
    try {

        let userDeposit = await Deposit.findById({ _id: depositId })
        let dashboard=await Dashboard.findOne({'info':'Yes'})
        let user = await User.findById(userDeposit.userId)
        //if status accepted.
        if (userDeposit.accountStatus === 'Accepted') {
            user.amount = JSON.stringify(parseFloat(user.amount, 10) - parseFloat(userDeposit.amount, 10));
            dashboard.totalUserBalance=JSON.stringify(parseFloat(dashboard.totalUserBalance,10)-parseFloat(userDeposit.amount,10));
            dashboard.totalDeposit=JSON.stringify(parseFloat(dashboard.totalDeposit,10)-parseFloat(userDeposit.amount,10));
            userDeposit.accountStatus = 'Rejected'
            await userDeposit.save();
            await user.save();
            await dashboard.save();
        }
        //if status pending
        if (userDeposit.accountStatus === 'Pending') {
            userDeposit.accountStatus = 'Rejected'
            await userDeposit.save();
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
const adminDeletedDepositPostController = async (req, res, next) => {
    const depositId = req.params.slug
    try {
        const userDeposit = await Deposit.findByIdAndDelete({ _id: depositId });

        let user = await User.findById(userDeposit.userId)

        if (Object.keys(userDeposit).length !== 0) {
            user.deposit.pull(depositId);
            await user.save();
        }
        return res.status(200).json({
            flashMessage: `Deposit delete successfull for ${user.username}`
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminDepositEditController = async (req, res, next) => {

    const { method, transferTo, transferFrom, amount, transactionId } = req.body;
    const error = depositErrorChecker({ method, transferTo, transferFrom, amount, transactionId })

    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            isDeposit: false,
            flashMessage: 'Please try again..'
        })
    }

    let depositUser = new Deposit({
        name: req.user.username,
        userId: req.user._id,
        method,
        transferTo,
        transferFrom,
        amount: parseInt(amount, 10),
        transactionId,
        accountStatus: 'Pending'
    })


    try {
        var balance = parseInt(amount, 10);
        if (balance >= 200 || balance <= 25000) {

            let depositUserInfo = await depositUser.save();
            let newUser = await User.findByIdAndUpdate({ _id: req.user._id })
            newUser.deposit.push(depositUserInfo._id);
            // newUser.amount=newUser.amount+parseInt(amount,10);
            await newUser.save();
            return res.status(201).json({
                isDeposit: true,
                flashMessage: 'Deposit your balance successfully please wait for admin approval'
            })
        }
        else {
            return res.status(201).json({
                isDeposit: false,
                flashMessage: 'You can deposit at least 200tk and at most 25000tk..'
            })
        }


    } catch (e) {
        return res.status(401).json({
            isDeposit: false,
            error: 'Please try again',
        })
    }


}

const adminDepositDeleteController = async (req, res, next) => {

}




module.exports = {
    adminDepositGetController,
    adminDepositPostController,
    adminDepositEditController,
    adminDepositDeleteController,
    adminRejectedDepositPostController,
    adminDeletedDepositPostController
}