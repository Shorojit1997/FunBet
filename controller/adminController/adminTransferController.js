const Transfer = require('../../models/Transfer')
const User = require('../../models/User')
var mongoose = require('mongoose');

const adminTransferGetController = async (req, res, next) => {
    try {

        const transferPending = await Transfer.find({ accountStatus: 'Pending' })
        const transferAccepted = await Transfer.find({ accountStatus: 'Accepted' })
        const transferRejected = await Transfer.find({ accountStatus: 'Rejected' })
        return res.status(201).json({
            transferPending,
            transferAccepted,
            transferRejected
        })
    }
    catch (e) {
        return res.status(401).json({
            error: 'Please try again..',
        })
    }

}
//accepted controlelr 
const adminTransferAcceptPostController = async (req, res, next) => {
    const transferId = req.params.slug
    if (!transferId) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
    try {
        let userTransfer = await Transfer.findById({ _id: transferId })
        
        let user = await User.findById(userTransfer.userId)
        let sendToUser = await User.findOne({ username: userTransfer.transferToId })
        
        if (userTransfer.accountStatus === 'Pending' || userTransfer.accountStatus === 'Rejected') {
            //send to 
            user.amount = parseFloat(user.amount, 10) - parseFloat(userTransfer.amount, 10);
            sendToUser.amount = parseFloat(sendToUser.amount, 10) + parseFloat(userTransfer.amount, 10);

            
            userTransfer.sendFromStatus = 'Send';
            userTransfer.sendToStatus = 'Accepted';
            userTransfer.accountStatus = "Accepted";

            sendToUser.transfer.push(userTransfer._id);

            await user.save();
            await userTransfer.save();
            await sendToUser.save();
            
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
const adminRejectedTransferPostController = async (req, res, next) => {
    const transferId = req.params.slug
    try {

        let userTransfer = await Transfer.findById({ _id: transferId })
        let sendToUser = await User.findOne({ username: userTransfer.transferToId })
        let user = await User.findById(userTransfer.userId)
        //if status accepted.
        if (userTransfer.accountStatus === 'Accepted') {

            user.amount = parseFloat(user.amount, 10) + parseFloat(userTransfer.amount, 10);
            sendToUser.amount = parseFloat(sendToUser.amount, 10) - parseFloat(userTransfer.amount, 10);

            userTransfer.sendFromStatus = 'Rejected';
            userTransfer.sendToStatus = 'Rejected';
            userTransfer.accountStatus = "Rejected";

            await user.save();
            await userTransfer.save();
            await sendToUser.save();
        }
        //if status pending
        if (userTransfer.accountStatus === 'Pending') {

            userTransfer.sendFromStatus = 'Rejected';
            userTransfer.sendToStatus = 'Rejected';
            userTransfer.accountStatus = "Rejected";

            await userTransfer.save();
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
const adminDeletedTransferPostController = async (req, res, next) => {
    const transferId = req.params.slug
    try {
        const userTransfer = await Transfer.findByIdAndDelete({ _id: transferId });

        let user = await User.findById(userTransfer.userId)
        let sendToUser = await User.findOne({ username: userTransfer.transferToId })

        if (Object.keys(userTransfer).length !== 0) {
            user.transfer.pull(transferId);
            sendToUser.transfer.pull(transferId);
            await user.save();
            await sendToUser.save();
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
    adminTransferGetController,
    adminTransferAcceptPostController,
    adminRejectedTransferPostController,
    adminDeletedTransferPostController
}