const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ClubSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        required: true
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
    clubName: {
        type: String,
        required: true
    },
    withdraw: [
        {
            type: Schema.Types.ObjectId,
            ref: 'withdraw'
        }
    ],
    sendMessage: [
        {
            type: Schema.Types.ObjectId,
            ref: 'sendMessage'
        }
    ],
    receiveMessage: [
        {
            type: Schema.Types.ObjectId,
            ref: 'receive'
        }
    ],
    totalWithdraw: {
        type: String,
        default: '0'
    },
    userlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'userlist'
        }
    ],

    amount: {
        type: String,
        default: 0
    },
    activeStatus: {
        type: String,
        default: 'Active',
        trim: true
    }

}, {
    timestamps: true
})

module.exports = model('club', ClubSchema);