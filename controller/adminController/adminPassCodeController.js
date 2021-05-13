
const PromoCode=require('../../models/PromoCode');


const getCode=async(req,res,next)=>{
    try{
         
    }
    catch(e){
        return res.status(400).json({
            isPass:false,
            flashMessage:'Please try again with vaild code'
        })
    }
}