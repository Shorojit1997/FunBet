const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SliderImages = new Schema({
    pictureUrl:{
        type:String,
        trim:true
    }
}, {
    timestamps: true
})

module.exports = model('sliderimage', SliderImages);