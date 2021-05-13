const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Deposits = new Schema({
  
    minimumDeposit:{
        type:String,
        trim:true,
        default:'0'
    },
    maximumDeposit:{
        type:String,
        trim:true,
        default:'0'
    },
    minimumWithdraw:{
        type:String,
        trim:true,
        default:'0'
    },
    maximumWithdraw:{
        type:String,
        trim:true,
        default:'0'
    },
    clubCommission:{
        type:String,
        trim:true,
        default:'0'
    },
    sponsorCommission:{
        type:String,
        trim:true,
        default:'0'
    },
    searchTag:{
        type:String,
        default:'finance'
    }
   
}, {
    timestamps: true
})

module.exports = model('financials', Deposits);