const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const AutoStack = new Schema({
    question: {
        type: String,
        trim: true,
    },
    isShow:{
        type: String,
        default: 'Show'
    },
    options:
        [
            {
                option: {
                    type: String,
                    default: '0'
                },
                rating: {
                    type: String,
                    default: '0'
                },
                betAmount: {
                    type: String,
                    default: '0'
                },
                returnAmount: {
                    type: String,
                    default: '0'
                },
                isShow:{
                    type: String,
                    default: 'Show'
                },
                userId: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'users'
                    }
                ]
            }
        ]
})


module.exports = model("autostack", AutoStack);