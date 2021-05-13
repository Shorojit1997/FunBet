


const GameBets = require('../models/GameBets');
const LudoRate = require('../models/LudoRate');
const Dashboard = require('../models/Dashboard');
const User = require('../models/User')
const ludoErrorChecker = require('../validator/ludoFormValidator');
const Club = require('../models/Clubinfo');
const Financial = require('../models/Financial')

const ludoUserGetController = async (req, res, next) => {


    try {
        const ludoRate = await LudoRate.findOneAndUpdate({ role: 'admin' });
        res.status(200).json({
            ludoRating: ludoRate.rating
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })
    }

}

const ludoUserPostController = async (req, res, next) => {


    const { tossNum, catchAmount } = req.body;

    //form validation 
    const error = ludoErrorChecker({ tossNum, catchAmount })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            flashMessage: 'Somethings happend wrongs please try again',
            error
        })
    }

    //type casting 
    var catchNumber = parseFloat(tossNum, 10);
    var amount = parseFloat(catchAmount, 10);



    try {

        const ludoRate = await LudoRate.findOneAndUpdate({ role: 'admin' });
        let dashboard = await Dashboard.findOneAndUpdate({ info: 'Yes' })
        if (amount < parseFloat(ludoRate.minimumBetsAmount, 10)) {
            return res.status(400).json({
                flashMessage: `Bet amount must be grater than  or equal ${ludoRate.minimumBetsAmount} taka `
            })
        }



        let user = await User.findByIdAndUpdate(req.user._id);
        //finding the luto rate and calculate winning possibility
        if (parseFloat(user.amount, 10) < amount) {
            return res.status(400).json({
                flashMessage: 'Insufficient your blance'
            })
        }


        const rating = parseFloat(ludoRate.rating, 10);
        const winningPossibility = parseFloat(ludoRate.winningPossibility, 10);
        const currentAdminwin = parseFloat(ludoRate.currentAdminwin, 10);
        const currentBets = parseFloat(ludoRate.currentBets, 10);

        let possibility = (currentAdminwin / (currentBets + (parseFloat(amount) * rating))) * 100;
        let randNumber = randonGenerator(possibility, winningPossibility, catchNumber);

        // club and sponsor



        let club = await Club.findOne({ 'clubName': user.clubName });//club

        let finance = await Financial.findOne({ 'searchTag': "finance" });//finance
        let clubCommission = parseFloat(finance.clubCommission)
        let sponsorCommission = parseFloat(finance.sponsorCommission)

        let clubAmount = ((clubCommission / 100) * amount);
        let sponsorAmount = 0;
        if (user.sponsorName)
            sponsorAmount = ((sponsorCommission / 100) * amount);
        let total = clubAmount + sponsorAmount;

        //creating bets account
        const gamebets = new GameBets({
            username: req.user.username,
            userId: req.user._id,
            Stake: catchNumber,
            R_stake: randNumber,
            amount: amount.toString(),
            returnRate: ludoRate.rating,
            possiblyWin: (rating * amount).toString(),
            winStatus: randNumber === catchNumber ? 'Congratulations' : 'You are loss'
        })

        const betsInfo = await gamebets.save();

        //finding user 

        user.games.push(betsInfo._id);
        user.amount = randNumber === catchNumber ? (parseFloat(user.amount, 10) + parseFloat(amount * (rating - 1))).toString() :
            parseFloat(user.amount, 10) - parseFloat(amount);
        await user.save();

        ludoRate.currentAdminwin = (randNumber === catchNumber ? currentAdminwin.toString() : (currentAdminwin + amount).toString());
        ludoRate.currentBets = (currentBets + amount).toString();

        ludoRate.totalIncome = randNumber === catchNumber ? (parseFloat(ludoRate.totalIncome, 10) - amount * (parseFloat(ludoRate.rating) - 1)).toString() : (parseFloat(ludoRate.totalIncome, 10) + amount).toString();
        ludoRate.totalBetsAmount = (parseFloat(ludoRate.totalBetsAmount, 10) + amount).toString()
        ludoRate.totalAdminWinMatch = randNumber === catchNumber ? ludoRate.totalAdminWinMatch : (parseFloat(ludoRate.totalAdminWinMatch, 10) + 1).toString();
        ludoRate.totalBetsMatch = (parseFloat(ludoRate.totalBetsMatch, 10) + 1).toString();

        if (randNumber === catchNumber) {
            dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance) + (amount * (parseFloat(ludoRate.rating) - 1)) + sponsorAmount);
            dashboard.totalGamebets = JSON.stringify(parseFloat(dashboard.totalGamebets) - (amount * (parseFloat(ludoRate.rating) - 1)) - total);
            dashboard.balance = JSON.stringify(parseFloat(dashboard.balance) - (amount * (parseFloat(ludoRate.rating) - 1)) - total);


            dashboard.clubCommision = JSON.stringify(parseFloat(dashboard.clubCommision) + clubAmount);
            dashboard.sponsorCommision = JSON.stringify(parseFloat(dashboard.sponsorCommision) + sponsorAmount);

            if (user.sponsorName) {
                let sponsor = await User.findOne({ 'sponsorName': user.sponsorName })//sponsor 
                sponsor.amount = JSON.stringify(parseFloat(sponsor.amount) + sponsorAmount)
                await sponsor.save();
            }
            club.amount = JSON.stringify(parseFloat(club.amount) + clubAmount);
        }
        else {
            dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance) - amount);
            dashboard.totalGamebets = JSON.stringify(parseFloat(dashboard.totalGamebets) + amount);
            dashboard.balance = JSON.stringify(parseFloat(dashboard.balance) + amount);
        }


        await Promise.all([
            dashboard.save(),
            ludoRate.save(),
            club.save(),
        ])


        res.status(200).json({
            tossNumber: randNumber,
            catchNumber: catchNumber,
            playStatus: randNumber === catchNumber ? 'Congratulations' : 'You are loss'
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })
    }

}

const gameBetsGetController = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const gameBets = await GameBets.find({ '_id': { $in: user.games } }).sort({ '_id': -1 })

        res.status(200).json({
            gameBets: gameBets
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })
    }
}



module.exports = { ludoUserGetController, ludoUserPostController, gameBetsGetController }


const randonGenerator = (possibility, winningPossibility, catchNumber) => {

    let randNumber = parseInt(((Math.random() * 100) % 6) + 1)
    // console.log('rand ', randNumber)
    if (possibility <= winningPossibility && randNumber === catchNumber) {
        while (true) {
            // console.log('yes');
            randNumber = parseInt(((Math.random() * 100 * randNumber) % 6) + 1);
            if (randNumber !== catchNumber) {
                tossNumber = randNumber;
                // console.log('randnumber=>', randNumber);
                break;
            }
        }
    }
    else if (possibility > winningPossibility && randNumber !== catchNumber)
        randNumber = catchNumber;

    return randNumber;
}