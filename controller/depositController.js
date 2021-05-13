
const mongoose = require('mongoose');
const Deposit = require('../models/Deposit')
const User = require('../models/User');
const Financial=require('../models/Financial')


const depositErrorChecker=require('../validator/depositValidator')
const depositGetController = async (req, res, next) => {
    try {
        const userData = await User.findById(req.user._id).lean();
        const depositData = await Deposit.find({ '_id': { $in: userData.deposit } }).limit(150).sort({'_id':-1}).lean();
      
        return res.status(201).json({
            depositData:depositData
        })
    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again',
        })
    }
}

const depositPostController = async (req, res, next) => {
    const { method, transferTo, transferFrom, amount, transactionId } = req.body
    const error=depositErrorChecker({ method, transferTo, transferFrom, amount, transactionId } )
    if(Object.keys(error).length!==0){
        return res.status(401).json({
            isDeposit:false,
            flashMessage:'Please try again..'
        })
    }
    let depositUser = new Deposit({
        username: req.user.username,
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
        let finance=await Financial.findOne({'searchTag':"finance"});
        let miniMumdeposit=parseFloat(finance.minimumDeposit);
        let maxiMumdeposit=parseFloat(finance.maximumDeposit);
        if (balance >= miniMumdeposit && balance <= maxiMumdeposit) {
             await depositUser.save();
            let newUser = await User.findById({ _id: req.user._id })
            newUser.deposit.push(depositUser._id);
            // newUser.amount=newUser.amount+parseInt(amount,10);
            await newUser.save();
            return res.status(201).json({
                isDeposit:true,
                flashMessage: 'Deposit your balance successfully please wait for admin approval'
            })
        }else{
            return res.status(201).json({
                isDeposit:false,
                flashMessage:`You can deposit at least ${miniMumdeposit}tk and at most ${maxiMumdeposit}tk..`
            })
        }


    } catch (e) {
        return res.status(401).json({
            isDeposit:false,
            error: 'Please try again',
        })
    }

}


module.exports = { depositGetController, depositPostController }