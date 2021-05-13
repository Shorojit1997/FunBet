
const CoinRate = require('../../models/CoinRate');
const UploadImage = require('../../models/UploadImage')

const ludoAdminFormErrorChecker = require('../../validator/ludoAdminFormValidator')



const coinRatingSetGetController = async (req, res, next) => {
    try {
        const coinInfo = await CoinRate.findOne({ role: 'admin' });
        let coinrate = new CoinRate(
            {
                rating: '0',
                winningPossibility: '0',
                gameName: 'wheel'
            })
        if (coinInfo == null) {
            await coinrate.save();
        }

        return res.status(200).json({
            flashMessage: '',
            coinInfo: coinInfo ? coinInfo : coinrate 
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Somethings happend error please try again...'
        })
    }

}



const coinRatingSetPostController = async (req, res, next) => {
    const { rating, winningPossibility, minimumBetsAmount } = req.body;

    const error = ludoAdminFormErrorChecker({ rating, winningPossibility, minimumBetsAmount })
    if (Object.keys(error).length !== 0) {
        return res.status(400).json({
            flashMessage: 'Please provide valid information',
            error: error,
        })
    }

    try {
        let findany = await CoinRate.findOne({ role: 'admin' });


        if (findany == null) {
            let coinrate = new CoinRate(
                {
                    rating: '0',
                    winningPossibility: '0',
                    gameName: 'wheel'
                })
            await coinrate.save();
        }

        let newUpdate = await CoinRate.findOneAndUpdate({ role: 'admin' })
        newUpdate.rating = rating;
        newUpdate.winningPossibility = winningPossibility;
        newUpdate.currentAdminwin = JSON.stringify(parseFloat(winningPossibility, 10) / 10)
        newUpdate.currentBets = '10'
        newUpdate.minimumBetsAmount = minimumBetsAmount
        await newUpdate.save();
        return res.status(200).json({
            flashMessage: 'Successfully updated your information...',
            coinrate: newUpdate
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Somethings happend error please try again...'
        })
    }

}

const coinAdminPicPostController = async (req, res, next) => {
    const picsUrl = req.params.slug;
    try {
        let ludoPics = await UploadImage.findById(picsUrl);
        let ludoRate = await CoinRate.findOneAndUpdate({ role: 'admin' });
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
    coinRatingSetGetController,
    coinRatingSetPostController,
    coinAdminPicPostController
}
