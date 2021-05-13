const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Admin = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    phone: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 14,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default:'Admin'
    },
    activeStatus: {
        type: String,
        default:'Active'
    },
   
}, {
    timestamps: true
})

module.exports = model('admins', Admin);