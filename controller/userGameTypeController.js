const GameType = require('../models/GameType')

//game type get controller
const gameTypeGetController = async (req, res, next) => {

    try {
        const gameType=await GameType.find({});
        return res.status(200).json({
            flashMessage: 'Successfully found your informations',
            gametype:gameType
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
}





module.exports=
{
    gameTypeGetController,
}
