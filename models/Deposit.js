const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Deposits = new Schema({
    username: String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userId'
    },
    method:{
        type:String,
        required:true,
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
        default:'Pending'
    },
}, {
    timestamps: true
})

module.exports = model('deposits', Deposits);