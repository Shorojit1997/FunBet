const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AccountType = new Schema({
    accountName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    accountActiveStatus: {
        type: String,
        default: 'Active'
    }
}, {
    timestamps: true
})

module.exports = model('accounttype', AccountType);