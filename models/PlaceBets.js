const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PlaceBets = new Schema({
    username: String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userId'
    },
    matchName:{
        type:String,
    },
    questionName:{
        type:String,
    },
    answer:{
        type:String,
    },
    amount:{
        type:String,
        trim:true,
    },
    returnRate:{
        type:String,
        trim:true,
    },
    possiblyWin:{
        type:String,
        trim:true,
    },
    returnAmount:{
        type:String,
        trim:true,
    },
    sponsor:{
        type:String,
        trim:true,
    },
    requestedAt:{
        type:Date,
        default:Date.now()
    },
    winStatus:{
        type:String,
        default:'Pending'
    },
    matchId:{
        type: Schema.Types.ObjectId,
    },
    questionId:{
        type: Schema.Types.ObjectId,
    },
    optionId:{
        type: Schema.Types.ObjectId,
    },
    picsUrl:String,
}, {
    timestamps: true
})

module.exports = model('placebets', PlaceBets);