const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ColorSettings = new Schema({
    searchTag:{
        type:String,
        defaultsearchTag: 'settings'
    },
    userBackground:{
        type:String,
        default:'#000',
        trim:true
    },
    userNavBackground:{
        type:String,
        default:'#000',
        trim:true
    },
    userNavTextColor:{
        type:String,
        default:'#000',
        trim:true
    },
    userNavTextActiveColor: {
        type:String,
        default:'#000',
        trim:true
    },
    userFooterBackground: {
        type:String,
        default:'#000',
        trim:true
    },
    userFooterTextColor: {
        type:String,
        default:'#000',
        trim:true
    },
    userFooterFontsize:{
        type:String,
        default:'16px',
        trim:true
    },
    userButtonColor: {
        type:String,
        default:'#000',
        trim:true
    },
    userButtonFontSize: {
        type:String,
        default:'16px',
        trim:true
    },
    adminBackground: {
        type:String,
        default:'#000',
        trim:true
    },
    adminNavBackground: {
        type:String,
        default:'#000',
        trim:true
    },
    adminNavTextColor: {
        type:String,
        default:'#000',
        trim:true
    },
    adminNavTextActiveColor:{
        type:String,
        default:'#000',
        trim:true
    },
    adminFooterBackground: {
        type:String,
        default:'#000',
        trim:true
    },
    adminFooterTextColor: {
        type:String,
        default:'#000',
        trim:true
    },
    adminFooterFontsize: {
        type:String,
        default:'#000',
        trim:true
    },
    adminButtonColor: {
        type:String,
        default:'#000',
        trim:true
    },
    adminButtonFontSize: {
        type:String,
        default:'16px',
        trim:true
    }
}, {
    timestamps: true
})

module.exports = model('colorsettings',ColorSettings);