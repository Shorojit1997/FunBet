


const GameBets = require('../models/GameBets');
const CoinRate = require('../models/CoinRate');
const Dashboard = require('../models/Dashboard');
const User = require('../models/User')
const ludoErrorChecker = require('../validator/ludoFormValidator');

const Club = require('../models/Clubinfo');
const Financial = require('../models/Financial')


const coinUserGetController = async (req, res, next) => {


    try {
        const coinRating = await CoinRate.findOne({ role: 'admin' });
        res.status(200).json({
            coinRating: coinRating.rating
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })
    }

}

const coinUserPostController = async (req, res, next) => {


    const { tossNum, catchAmount } = req.body;

    //form validation 
    const error = ludoErrorChecker({ tossNum, catchAmount })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            flashMessage: 'Somethings happend wrongs please try again',
        })
    }

    //type casting 
    var catchNumber = parseFloat(tossNum, 10);
    var amount = parseFloat(catchAmount, 10);



    try {

        const coinRate = await CoinRate.findOne({ role: 'admin' });
        let dashboard = await Dashboard.findOne({ info: 'Yes' });
        if (amount < parseFloat(coinRate.minimumBetsAmount, 10)) {
            return res.status(400).json({
                flashMessage: `Bet amount must be grater than  or equal ${coinRate.minimumBetsAmount} taka `
            })
        }


        let user = await User.findById(req.user._id);
        //finding the luto rate and calculate winning possibility
        if (parseFloat(user.amount, 10) < amount) {
            return res.status(400).json({
                flashMessage: 'Insufficient your blance'
            })
        }


        const rating = parseFloat(coinRate.rating, 10);
        const winningPossibility = parseFloat(coinRate.winningPossibility, 10);
        const currentAdminwin = parseFloat(coinRate.currentAdminwin, 10);
        const currentBets = parseFloat(coinRate.currentBets, 10);

        let possibility = (currentAdminwin / (currentBets + (parseFloat(amount) * rating))) * 100;
        let randNumber = randonGenerator(possibility, winningPossibility, catchNumber)



        // club and sponsor



        let club = await Club.findOne({ 'clubName': user.clubName });//club

        let finance = await Financial.findOne({ 'searchTag': "finance" });//finance
        let clubCommission = parseFloat(finance.clubCommission)
        let sponsorCommission = parseFloat(finance.sponsorCommission)

        let clubAmount = ((clubCommission / 100) * amount)
        let sponsorAmount = 0;
        if (user.sponsorName)
            sponsorAmount = ((sponsorCommission / 100) * amount);
        let total = clubAmount + sponsorAmount;


        //creating bets account
        const gamebets = new GameBets({
            username: req.user.username,
            userId: req.user._id,
            Stake: catchNumber == '1' ? 'Head' : 'Tail',
            R_stake: randNumber == '1' ? 'Head' : 'Tail',
            amount: amount.toString(),
            gameName: 'coin_toss',
            returnRate: coinRate.rating,
            possiblyWin: (rating * amount).toString(),
            winStatus: randNumber === catchNumber ? 'Congratulations' : 'You are loss'
        })

        const betsInfo = await gamebets.save();

        //finding user 


        user.games.push(betsInfo._id);
        user.amount = randNumber === catchNumber ? (parseFloat(user.amount, 10) + parseFloat(amount * (rating - 1))).toString() :
            parseFloat(user.amount, 10) - parseFloat(amount);
        await user.save();

        coinRate.currentAdminwin = (randNumber === catchNumber ? currentAdminwin.toString() : (currentAdminwin + amount).toString());
        coinRate.currentBets = (currentBets + amount).toString();

        coinRate.totalIncome = randNumber === catchNumber ? (parseFloat(coinRate.totalIncome, 10) - amount * (parseFloat(coinRate.rating) - 1)).toString() : (parseFloat(coinRate.totalIncome, 10) + amount).toString();
        coinRate.totalBetsAmount = (parseFloat(coinRate.totalBetsAmount, 10) + amount).toString()
        coinRate.totalAdminWinMatch = randNumber === catchNumber ? coinRate.totalAdminWinMatch : (parseFloat(coinRate.totalAdminWinMatch, 10) + 1).toString();
        coinRate.totalBetsMatch = (parseFloat(coinRate.totalBetsMatch, 10) + 1).toString();

        if (randNumber === catchNumber) {
            dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance) + (amount * (parseFloat(coinRate.rating) - 1) + sponsorAmount));
            dashboard.totalGamebets = JSON.stringify(parseFloat(dashboard.totalGamebets) - (amount * (parseFloat(coinRate.rating) - 1)) - total);
            dashboard.balance = JSON.stringify(parseFloat(dashboard.balance) - (amount * (parseFloat(coinRate.rating) - 1)) - total);

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
            coinRate.save(),
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




module.exports = { coinUserGetController, coinUserPostController }


const randonGenerator = (possibility, winningPossibility, catchNumber) => {

    let randNumber = parseInt(((Math.random() * 100) % 2) + 1);
    if (possibility <= winningPossibility && randNumber === catchNumber) {
        if (catchNumber === 1)
            randNumber = 2;
        else
            randNumber = 1;
    }
    else if (possibility > winningPossibility && randNumber !== catchNumber)
        randNumber = catchNumber;
    return randNumber;
}