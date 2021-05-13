
const GameBets = require('../../models/GameBets');
const LudoRate = require('../../models/LudoRate')
const UploadImage = require('../../models/UploadImage')

const ludoAdminFormErrorChecker = require('../../validator/ludoAdminFormValidator')




const gameAdminGetController = async (req, res, next) => {
  const betType = req.params.slug;

  try {
    const gamebets = await GameBets.find({ gameName: betType }).sort({ '_id': -1 });
    return res.status(200).json({
      flashMessage: 'Successfully found',
      gameList: gamebets,
    })

  } catch (e) {
    return res.status(400).json({
      flashMessage: 'Somethings happend error please try again...'
    })
  }
}


const ludoRatingSetGetController = async (req, res, next) => {
  try {
    const ludoInfo = await LudoRate.findOne({ role: 'admin' });

    let ludorate = new LudoRate(
      {
        rating: '0',
        winningPossibility: '0',
        gameName: 'ludo'
      })
    if (ludoInfo == null) {
      await ludorate.save();
    }
    return res.status(200).json({
      flashMessage: 'Successfully found your information',
      ludoInfo: ludoInfo ? ludoInfo : ludorate
    })

  } catch (e) {
    return res.status(400).json({
      flashMessage: 'Somethings happend error please try again...'
    })
  }

}



const ludoRatingSetPostController = async (req, res, next) => {
  const { rating, winningPossibility, minimumBetsAmount } = req.body;

  const error = ludoAdminFormErrorChecker({ rating, winningPossibility, minimumBetsAmount })
  if (Object.keys(error).length !== 0) {
    return res.status(400).json({
      flashMessage: 'Please provide valid information',
      error: error,
    })
  }

  try {
    let findany = await LudoRate.findOne({ role: 'admin' });


    if (findany == null) {
      let ludorate = new LudoRate(
        {
          rating: '0',
          winningPossibility: '0',
          gameName: 'ludo'
        })
      await ludorate.save();
    }

    let newUpdate = await LudoRate.findOneAndUpdate({ role: 'admin' })
    newUpdate.rating = rating;
    newUpdate.winningPossibility = winningPossibility;
    newUpdate.currentAdminwin = JSON.stringify(parseFloat(winningPossibility, 10) / 10)
    newUpdate.currentBets = '10'
    newUpdate.minimumBetsAmount = minimumBetsAmount
    await newUpdate.save();
    return res.status(200).json({
      flashMessage: 'Successfully updated your information...',
      ludoInfo: newUpdate
    })

  } catch (e) {
    return next(e);
  }

}

const ludoAdminPicPostController = async (req, res, next) => {
  const picsUrl = req.params.slug;
  try {
    let ludoPics = await UploadImage.findById(picsUrl);
    let ludoRate = await LudoRate.findOneAndUpdate({ role: 'admin' });
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
  gameAdminGetController,
  ludoRatingSetGetController,
  ludoRatingSetPostController,
  ludoAdminPicPostController
}
