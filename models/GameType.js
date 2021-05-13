const mongoose=require('mongoose');
const {model,Schema} = mongoose;



const GameType=new Schema({
    name:{
        type:String,
        trim:true
    },
    picsUrl:String,
   
})


module.exports=model("gameType",GameType);