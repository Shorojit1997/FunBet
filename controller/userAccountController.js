
const AccountType =require('../models/AccountType')




const userAccountGetController=async(req,res,next)=>{
    try{
        const accountInfo=await AccountType.find({accountActiveStatus:'Active'});
        res.status(201).json({
            data:accountInfo
        })
    }
    catch(e){
      return  res.status(401).json({
           flashMessage:'Somethings happend error'
        })
    }
}


module.exports= {userAccountGetController};