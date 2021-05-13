const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LudoRates = new Schema({
    rating: {
        type: String,
        trim: true
    },
    winningPossibility: {
        type: String,
        trim: true
    },
    totalIncome: {
        type: String,
        trim: true,
        default:'0'
    },
    totalBetsAmount: {
        type: String,
        trim: true,
        default:'0'
    },
    totalAdminWinMatch: {
        type: String,
        trim: true,
        default:'0'
    },
    totalBetsMatch: {
        type: String,
        trim: true,
        default:'0'
    },
    currentAdminwin: {
        type: String,
        trim: true,
        default:'1'
    },
    currentBets: {
        type: String,
        trim: true,
        default:'1'
    },
    requestedAt: {
        type: Date,
        default: Date.now()
    },
    role:{
        type:String,
        default:'admin'
    },
    picsUrl:{
        type:String,
        default:"public/images/default.png"
    },
    minimumBetsAmount:{
        type:String,
        trim:true,
        default:'30'
    }
}, {
    timestamps: true
})

module.exports = model('ludorate', LudoRates);