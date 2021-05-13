const Transfer = require('../models/Transfer')
const User = require('../models/User')

const transferGetController = async (req, res, next) => {

    try {
        const userData = await User.findById(req.user._id);
        const transferData = await Transfer.find({ '_id': { $in: userData.transfer } })
        return res.status(201).json({
            transferData:transferData
        })
    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }

}

const transferPostController = async (req, res, next) => {

    const { username,email, phone, amount, counterNumber } = req.body

    try {
        
        let balance = parseInt(amount, 10);

        //send user account finding
        const sendto = await User.findOne({username:username})

        if (!sendto ) {
            return res.status(401).json({
                isTransfer: false,
                flashMessage: 'Please provide valid username... '
            })
        }
    
        if(sendto.username === req.user.username){
            return res.status(401).json({
                isTransfer: false,
                flashMessage: 'You don\'t send to yourself.'
            })
        }

        let transferUser = new Transfer({
            username: req.user.username,
            userId: req.user._id,
            transferToId: sendto.username,
            transferFromId: req.user.username,
            amount: amount,
            sendToStatus: 'Pending',
            sendFromStatus: 'Pending',
            accountStatus:"Pending"
        })
        if (parseFloat(req.user.amount )>= parseFloat(balance,10) && parseFloat(balance,10)>=500 ) {

            let transferUserInfo = await transferUser.save();
            let newUser = await User.findByIdAndUpdate({ _id: req.user._id })
            newUser.transfer.push(transferUserInfo._id);
            // newUser.amount=newUser.amount+parseInt(amount,10);
            await newUser.save();
            return res.status(201).json({
                isTransfer: true,
                flashMessage: 'Transfer your balance successfully please wait for admin approval.'
            })
        }
        else {
            return res.status(401).json({
                isTransfer: false,
                flashMessage: 'Insufficient your balance or less than 500 taka.'
            })
        }
    }
    catch (e) {
        return res.status(401).json({
            isTransfer: false,
            error: 'Please try again.'
        })
    }

}


module.exports = { transferGetController, transferPostController }