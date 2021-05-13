
// const { json } = require('body-parser');
const Bets = require('../models/Bets');
const PlaceBets = require('../models/PlaceBets')
const User = require('../models/User')
const Dashboard = require('../models/Dashboard')



const userBetsGetController = async (req, res, next) => {
    try {
        const upcommingBets = await Bets.find({ playStatus: 'Upcomming' })
        const liveBets = await Bets.find({ playStatus: 'Live' })
        let newUp = hideFromUser(upcommingBets);
        let newLiv = hideFromUser(liveBets);
        let bets = [...newUp, ...newLiv]
        res.status(201).json({
            flashMessage: 'Successfully found ',
            bets: bets,
        })

    }
    catch (error) {
        return res.status(400).json({
            flashMessage: 'Please try again.',
            bets: []
        })
    }

}

const userPlaceBetGetController = async (req, res, next) => {

    try {
        const placeBets = await PlaceBets.find({ '_id': { $in: req.user.bets } }).sort({ _id: -1 })
        return res.status(200).json({
            flashMessage: 'Successfully found bet items',
            placeBetsData: placeBets
        })

    }
    catch (error) {
        return res.status(400).json({
            flashMessage: 'Please try again.',
            placeBetsData: []
        })
    }
}

const userPlaceBetPostController = async (req, res, next) => {
    const { matchId, questionId, optionId, amount } = req.body;

    if (!matchId || !questionId || !optionId || !amount) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }
    if (parseFloat(amount, 10) < 20) {
        return res.status(400).json({
            flashMessage: 'Your bet amount must be 20 taka'
        })
    }

    try {
        let user = await User.findByIdAndUpdate({ _id: req.user._id });
        let dashboard = await Dashboard.findOneAndUpdate({ 'info': 'Yes' })
        if (parseFloat(user.amount, 10) <= parseFloat(amount, 10)) {
            return res.status(400).json({
                flashMessage: 'You do not have enough amount.'
            })
        }

        const betsarray = await Bets.findById({ _id: matchId });

        const question = findingquestion(betsarray, questionId);
        const option = findingOption(question, optionId);

        if (Object.keys(option).length === 0 || Object.keys(question).length === 0) {
            return res.status(400).json({
                flashMessage: 'Please provide valid informations',
            })
        }

        let placebet = new PlaceBets({
            username: req.user.username,
            userId: req.user._id,
            matchName: betsarray.teamA + ' VS ' + betsarray.teamB,
            questionName: question.question,
            answer: option.option,
            amount: amount,
            returnRate: option.rating,
            possiblyWin: JSON.stringify(parseFloat(option.rating) * parseFloat(amount)),
            returnAmount: JSON.stringify(parseFloat(option.rating) * parseFloat(amount)),
            matchId:matchId,
            questionId:questionId,
            optionId:optionId
        })

        let betinfo = await placebet.save();

        let newScore = JSON.stringify(parseFloat(betsarray.score, 10) + 1);
        let newtotalBetsAmount = JSON.stringify(parseFloat(betsarray.totalBetsAmount, 10) + parseFloat(amount,10));
        await Bets.findByIdAndUpdate(
            { _id: matchId },
            { $push: { 'questions.$[q1].options.$[o1].userId': betinfo._id } },
            { arrayFilters: [{ 'q1._id': questionId }, { 'o1._id': optionId }] }
        )
        
        let newAmount=JSON.stringify(parseFloat(option.betAmount,10)+parseFloat(amount,10));

        await Bets.findByIdAndUpdate(
            { _id: matchId },
            { $set: { 'questions.$[q1].options.$[o1].betAmount':newAmount  ,'score': newScore, 'totalBetsAmount': newtotalBetsAmount } },
            { arrayFilters: [{ 'q1._id': questionId }, { 'o1._id': optionId }]},
        )
        user.bets.push(betinfo._id);
        user.amount = JSON.stringify(parseFloat(user.amount, 10) - parseFloat(amount, 10));
        dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance, 10) - parseFloat(amount, 10));
        dashboard.balance = JSON.stringify(parseFloat(dashboard.balance, 10) + parseFloat(amount, 10));
        await user.save();
        await dashboard.save();
        res.status(200).json({
            flashMessage: 'Congratulations for place the bets'
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: 'Please try again.',
        })
    }

}

module.exports = { userBetsGetController, userPlaceBetPostController, userPlaceBetGetController }

const findingOption = (question, optionId) => {
    let opt = {};
    question.options.map(option => {
        if (option._id == optionId) {
            opt = option;
        }
    })

    return opt;
}
const findingquestion = (betsarray, questionId) => {
    let qst;
    betsarray.questions.map((question) => {
        if (question._id == questionId) {
            qst = question;
        }
    })
    return qst;
}

const hideFromUser = (element) => {
    return element.map(item => {
        let newQuestions = item.questions.map(q => {
            let newOptions = q.options.map(op => {
                return {
                    option: op.option,
                    rating: op.rating,
                    betAmount: op.betAmount,
                    returnAmount: op.returnAmount,
                    winStatus: op.winStatus,
                    _id: op._id
                }
            })
            return {
                isShow: q.isShow,
                isFinished: q.isFinished,
                _id: q._id,
                question: q.question,
                options: newOptions,
            }

        })
        return {
            _id: item._id,
            gameDate: item.gameDate,
            gameTime:item.gameTime,
            teamA: item.teamA,
            teamB: item.teamB,
            playStatus: item.playStatus,
            gameType: item.gameType,
            picsUrl:item.picsUrl,
            turnamentName: item.turnamentName,
            questions: newQuestions,
            createdAt: item.createdAt,
        }
    })
}