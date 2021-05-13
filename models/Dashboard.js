const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Dashboard = new Schema({
    info:{
        type:String,
        default:'Yes'
    },
    totalUser: {
        type: String,
        default: '0',
        trim: true
    },
    totalClub: {
        type: String,
        default: '0',
        trim: true
    },
    totalUserBalance: {
        type: String,
        default: '0',
        trim: true
    },
    totalDeposit: {
        type: String,
        default: '0',
        trim: true
    },
    totalWithdraw: {
        type: String,
        default: '0',
        trim: true
    },
    clubCommision: {
        type: String,
        default: '0',
        trim: true
    },
    sponsorCommision: {
        type: String,
        default: '0',
        trim: true
    },
    totalCommision: {
        type: String,
        default: '0',
        trim: true
    },
    totalProfit: {
        type: String,
        default: '0',
        trim: true
    },
    totalGamebets: {
        type: String,
        default: '0',
        trim: true
    },
    adminProfit: {
        type: String,
        default: '0',
        trim: true
    },
    balance: {
        type: String,
        default: '0',
        trim: true
    },


}, {
    timestamps: true
})

module.exports = model('dashboard', Dashboard);