
const GameBets = require('../../models/GameBets');
const WheelRate = require('../../models/WheelRate')
const UploadImage = require('../../models/UploadImage')

const ludoAdminFormErrorChecker = require('../../validator/ludoAdminFormValidator')



const wheelRatingSetGetController = async (req, res, next) => {
    try {
        const wheelInfo = await WheelRate.findOne({ role: 'admin' });
        let wheelrate = new WheelRate(
            {
                rating: '0',
                winningPossibility: '0',
                gameName: 'wheel'
            })
        if (wheelInfo == null) {
            await wheelrate.save();
        }

        return res.status(200).json({
            flashMessage: 'Successfully found your information',
            wheelInfo: wheelInfo ? wheelInfo : wheelrate 
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Somethings happend error please try again...'
        })
    }

}



const wheelRatingSetPostController = async (req, res, next) => {
    const { rating, winningPossibility, minimumBetsAmount } = req.body;

    const error = ludoAdminFormErrorChecker({ rating, winningPossibility, minimumBetsAmount })
    if (Object.keys(error).length !== 0) {
        return res.status(400).json({
            flashMessage: 'Please provide valid information',
            error: error,
        })
    }

    try {
        let findany = await WheelRate.findOne({ role: 'admin' });


        if (findany == null) {
            let wheelrate = new WheelRate(
                {
                    rating: '0',
                    winningPossibility: '0',
                    gameName: 'wheel'
                })
            await wheelrate.save();
        }

        let newUpdate = await WheelRate.findOneAndUpdate({ role: 'admin' })
        newUpdate.rating = rating;
        newUpdate.winningPossibility = winningPossibility;
        newUpdate.currentAdminwin = JSON.stringify(parseFloat(winningPossibility, 10) / 10)
        newUpdate.currentBets = '10'
        newUpdate.minimumBetsAmount = minimumBetsAmount
        await newUpdate.save();
        return res.status(200).json({
            flashMessage: 'Successfully updated your information...',
            wheelrate: newUpdate
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Somethings happend error please try again...'
        })
    }

}

const wheelAdminPicPostController = async (req, res, next) => {
    const picsUrl = req.params.slug;
    try {
        let ludoPics = await UploadImage.findById(picsUrl);
        let ludoRate = await WheelRate.findOneAndUpdate({ role: 'admin' });
        ludoRate.picsUrl = ludoPics.pictureUrl;
        await ludoRate.save();
        return res.status(200).json({
            flashMessage: "Successfully uploaded your picture"
        })
    } catch (e) {
        return res.status(400).json({
            flashMessage: "Somethings happed worng please try again"
        })
    }
}



module.exports = {
    wheelRatingSetGetController,
    wheelRatingSetPostController,
    wheelAdminPicPostController
}
