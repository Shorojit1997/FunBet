const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GameBets = new Schema({
    username: String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userId'
    },
    Stake:{
        type:String,
    },
    R_stake:{
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
    },
    requestedAt:{
        type:Date,
        default:Date.now()
    },
    winStatus:{
        type:String,
        default:'You are fail'
    },
    gameName:{
        type:String,
        default:'ludo'
    },
    picsUrl:String,
}, {
    timestamps: true
})

module.exports = model('gamebets', GameBets);