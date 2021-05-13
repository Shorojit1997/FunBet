const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Withdraws = new Schema({
    username: String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userId'
    },
    method:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
    },
    transferTo:{
        type:String,
        trim:true,
    },
    transferFrom:{
        type:String,
        trim:true,
    },
    amount:{
        type:Number,
        trim:true,
    },
    
    transactionId:{
        type:String,
        trim:true,
    },
    counterNumber:{
        type:String,
    },
    requestedAt:{
        type:Date,
        default:Date.now()
    },
    accountStatus:{
        type:String,
        required:true,
    },
}, {
    timestamps: true
})

module.exports = model('withdraws', Withdraws);