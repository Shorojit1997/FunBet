const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UploadImages = new Schema({
    pictureUrl:{
        type:String,
        default:"public/images/default.png"
    }
}, {
    timestamps: true
})

module.exports = model('uploadimages', UploadImages);