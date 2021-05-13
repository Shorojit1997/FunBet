const Clubinfo = require('../models/Clubinfo');

const cubListgetController=async(req,res,next)=>{
    try{

        const clubList=await Clubinfo.find({});
        return res.status(200).json({
            clubList:arrayFilter(clubList)
        })

    }catch(e){
        return res.status(400).json({
            flashMessage:'Please try again..'
        })
    }
}

module.exports={cubListgetController}

const arrayFilter=(arraylist)=>{
    return arraylist.map(item=>{
        return(item.clubName)
    })
}