const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const dat=new Date();
const year=dat.getFullYear();

const GeneralSettings = new Schema({
    searchTag: {
        type: String,
        default: 'settings',
    },
    title: {
        type: String,
        default: 'Title',
        trim: true,
    },
    email: {
        type: String,
        default: 'example@gmail.com',
        trim: true,
    },
    phone: {
        type: String,
        default: '017xxxxxxxx',
        trim: true,
    },
    year: {
        type: String,
        default:JSON.stringify(year),
        trim: true,
    },
    copyWriteText: {
        type: String,
        default: 'Copywrite',
        trim: true,
    },
    websiteName: {
        type: String,
        default: 'BetMe',
        trim: true,
    },
    noticeText: {
        type: String,
        default: 'Notice',
        trim: true,
    },
    logoUrl: {
        type: String,
        default: '/images/default.png',
        trim: true,
    },
}, {
    timestamps: true
})

module.exports = model('generalsettings', GeneralSettings);