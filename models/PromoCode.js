const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PromoCode = new Schema({
    promocode:{
        type:String,
    }
}, {
    timestamps: true
})

module.exports = model('promocodes', PromoCode);