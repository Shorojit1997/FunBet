const PromoCode = require('../../models/PromoCode')

//add gametype
const addPromocodeGetController = async (req, res, next) => {
    try {
        const promocode=await PromoCode.find({}).sort({'_id':-1});
        return res.status(200).json({
            promocode
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
}

//add gametype
const addPromocodePostController = async (req, res, next) => {
    console.log(req.body)
    const { promocode} = req.body;
    if (!promocode) {
        return res.status(400).json({
            flashMessage: 'Promocode can not be empty.'
        })
    }
    try {
        const code = new PromoCode({
            promocode:promocode
        })
        await code.save();
        return res.status(200).json({
            flashMessage: 'Successfully added your code'
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
}


//delete gameinfo

const deletePromocodePostController = async (req, res, next) => {
    const codeId= req.params.slug;
    if ( !codeId) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
    try{
        await PromoCode.findByIdAndDelete(codeId);
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
    addPromocodeGetController,
    addPromocodePostController,
    deletePromocodePostController
}
