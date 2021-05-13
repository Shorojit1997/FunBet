const mongoose=require('mongoose');
const {model,Schema} = mongoose;



const AutoStackName=new Schema({
    name:{
        type:String,
        trim:true
    },
    questionsId:[
        {
            type:Schema.Types.ObjectId,
            ref:"autostack"
        }
    ]
})


module.exports=model("autostackname",AutoStackName);