const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const receive = new Schema({
    username:String,
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'userid'
    },
    message: String,


}, {
    timestamps: true
})

module.exports = model('receive', receive);