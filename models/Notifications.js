const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Notifications = new Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    requestedAt:{
        type:Date,
        default:Date.now()
    },
   
}, {
    timestamps: true
})

module.exports = model('notifications', Notifications);