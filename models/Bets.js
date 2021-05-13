const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Bets = new Schema({

    teamA: String,
    teamB: String,
    playStatus:String,
    gameType:String,
    picsUrl:String,
    turnamentName:String,
    gameDate:{
        type:String,
        default:Date.now()
    },
    gameTime:{
        type:String,
        default:Date.now()
    },
    totalBetsAmount:{
        type:String,
        default:'0',
        trim:true,
    },
    totalReturnAmount:{
        type:String,
        default:'0',
        trim:true,
    },
    score:{
        type:String,
        default:'0',
        trim:true,
    },
    questions: [
        {
            question: String,
            isShow:{
                type: String,
                default: 'Show'
            },
            isFinished:{
                type: String,
                default: 'No'
            },
            options: 
            [
                {
                    option: {
                        type:String,
                        default:'0'
                    },
                    rating: {
                        type:String,
                        default:'0'
                    },
                    betAmount:{
                        type:String,
                        default:'0'
                    },
                    returnAmount:{
                        type:String,
                        default:'0'
                    },
                    winStatus:{
                        type:String,
                        default:'Pending'
                    },

                    userId: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'users'
                        }
                    ]
                }
            ]
        }
    ],
}, {
    timestamps: true
})

module.exports = model('bets', Bets);