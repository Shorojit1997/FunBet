const Withdraw = require('../models/Withdraw')
const User = require('../models/User');
const Financial=require('../models/Financial')

const withdrawGetController = async (req, res, next) => {

    try {
        const userData = await User.findById(req.user._id);
        const withdrawData = await Withdraw.find({ '_id': { $in: userData.withdraw } })
        return res.status(201).json({
           withdrawData:withdrawData
        })
    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }

}

const withdrawPostController = async (req, res, next) => {

    const { method, accountType, transferTo, transferFrom, amount } = req.body

    let withdrawUser = new Withdraw({
        username: req.user.username,
        userId: req.user._id,
        method,
        accountType,
        transferTo,
        amount: parseFloat(amount, 10),
        accountStatus: 'Pending'
    })
    try {
        balance = parseFloat(amount, 10);
        let finance=await Financial.findOne({'searchTag':"finance"});
        let miniMumbwithdraw=parseFloat(finance.minimumWithdraw);
        let maxiumwithdraw=parseFloat(finance.maximumWithdraw)
        if (parseFloat( req.user.amount) >= balance && parseFloat( req.user.amount)>=miniMumbwithdraw && parseFloat( req.user.amount)<=maxiumwithdraw) {
            let withdrawUserInfo = await withdrawUser.save();
            let newUser = await User.findByIdAndUpdate({ _id: req.user._id })
            newUser.withdraw.push(withdrawUserInfo._id);
            // newUser.amount=newUser.amount+parseInt(amount,10);
            await newUser.save();
            return res.status(201).json({
                isWithdraws: true,
                flashMessage: 'Withdraws your account successfully please wait for admin approval'
            })
        }
        else {
            return res.status(401).json({
                isWithdraws: false,
                flashMessage: `Insufficient your balance or less than ${miniMumbwithdraw} taka`
            })
        }
    }
    catch (e) {
        return res.status(401).json({
            isWithdraws: false,
            error: 'Please try again'
        })
    }

}


module.exports = { withdrawGetController, withdrawPostController }