const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
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
    username: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    sponsorName: {
        type: String,
    },
    deposit: [
        {
            type: Schema.Types.ObjectId,
            ref: 'deposit'
        }
    ],
    withdraw: [
        {
            type: Schema.Types.ObjectId,
            ref: 'withdraw'
        }
    ],
    transfer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'transfer'
        }
    ],
    bets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'bets'
        }
    ],
    games:[
        {
            type: Schema.Types.ObjectId,

        }
    ],

    amount: {
        type: String,
        default: 0
    },
    activeStatus:{
        type:String,
        default:'Active',
        trim:true
    }

}, {
    timestamps: true
})

module.exports = model('users', UserSchema);