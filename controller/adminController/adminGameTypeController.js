const GameType = require('../../models/GameType');
const UploadImage=require('../../models/UploadImage')

//game type get controller
const addGameTypeGetController = async (req, res, next) => {

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



//add gametype
const addGameTypePostController = async (req, res, next) => {
    const { name} = req.body;
    if (!name) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
    try {
        const gametype = new GameType({
            name: name,
            picsUrl: '/images/default.png'
        })
        await gametype.save();
        return res.status(200).json({
            flashMessage: 'Successfully added your informations'
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
}

//edit game info
const editGameTypePostController = async (req, res, next) => { 
    const editId=req.params.slug
    const { picId}= req.body;
    if ( !picId || !editId) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
    try{
        let editgameType=await GameType.findByIdAndUpdate({_id:editId});
        let pics= await UploadImage.findById(picId)
        editgameType.picsUrl=pics.pictureUrl;
        await editgameType.save();
        return res.status(200).json({
            flashMessage: 'Successfully updated informations'
        })
    }
    catch(e){
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }

}
//delete gameinfo

const deleteGameTypePostController = async (req, res, next) => {
    const gameId= req.params.slug;
    if ( !gameId) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
    try{
        await GameType.findByIdAndDelete(gameId);
        return res.status(200).json({
            flashMessage: 'Successfully deleted informations'
        })
    
    }
    catch(e){
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
}



module.exports=
{
    addGameTypeGetController,
    addGameTypePostController,
    editGameTypePostController,
    deleteGameTypePostController
}
