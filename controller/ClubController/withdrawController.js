const Withdraw = require('../../models/Withdraw')
const Club = require('../../models/Clubinfo')

const withdrawGetController = async (req, res, next) => {

    try {
        const userData = await Club.findById(req.club._id);
        const withdrawData = await Withdraw.find({ '_id': { $in: userData.withdraw } }).limit(100).sort({'_id':-1})
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
        username: `${req.club.clubName}(Club)`,
        userId: req.club._id,
        method,
        accountType,
        transferTo,
        amount: parseFloat(amount, 10),
        accountStatus: 'Pending'
    })
    try {
        balance = parseFloat(amount, 10);
        if (parseFloat( req.club.amount) >= balance && parseFloat( req.club.amount)>=500 ) {
            let withdrawUserInfo = await withdrawUser.save();
            let newUser = await Club.findById( req.club._id )
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
                flashMessage: 'Insufficient your balance or less than 500 taka'
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