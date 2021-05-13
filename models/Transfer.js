const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Transfer = new Schema({
    username: String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userId'
    },
    transferToId:{
        type:String,
        trim:true,
    },
    transferFromId:{
        type:String,
        trim:true,
    },
    amount:{
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
    sendToStatus:{
        type:String,
        default:'Pending',
        trim:true,
    },
    sendFromStatus:{
        type:String,
        default:'Pending',
        trim:true,
    },
    accountStatus:{
        type:String,
        default:'Pending',
        trim:true,
    }
}, {
    timestamps: true
})

module.exports = model('transfers', Transfer);