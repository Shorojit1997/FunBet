
const Bets = require('../../models/Bets');
const AutoStack = require('../../models/AutoStack');
const AutoStackName = require('../../models/AutoStackName')
const User = require('../../models/User')
const PlaceBets = require('../../models/PlaceBets')
const Dashboard = require('../../models/Dashboard');
const Financial = require('../../models/Financial');
const Club = require('../../models/Clubinfo')


const winPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { questionId, optionId } = req.body;

    if (!matchId || !questionId || !optionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        let betInfo = await Bets.findById(matchId);
        const info = findingInfomations(betInfo, questionId, optionId);
        const finance = await Financial.findOne({ 'searchTag': "finance" });
        const winId = info.winId;
        const loseId = info.lossId;
        //win update
        let clubCommission = parseFloat(finance.clubCommission)
        let sponsorCommission = parseFloat(finance.sponsorCommission)
        winId.map(async (item, index) => {
            try {
                //get data from database
                console.log('yes')
                let placeWinlist = await PlaceBets.findById({ '_id': item });
                let dashboard = await Dashboard.findOne({ info: 'Yes' })
                let userInfo = await User.findById({ '_id': placeWinlist.userId });
                let sponsor = await User.findOne({ 'username': userInfo.sponsorName })
                let betdetails = await Bets.findById(matchId);
                let club = await Club.findOne({ "clubName": userInfo.clubName })



                placeWinlist.winStatus = 'Win';
                betdetails.totalReturnAmount = parseFloat(betdetails.totalReturnAmount, 10) + parseFloat(placeWinlist.possiblyWin);
                userInfo.amount = JSON.stringify(parseFloat(userInfo.amount, 10) + parseFloat(placeWinlist.possiblyWin));

                let clubAmount = ((clubCommission / 100) * parseFloat(placeWinlist.amount))
                let sponsorAmount = ((sponsorCommission / 100) * parseFloat(placeWinlist.amount));
                let total = clubAmount + sponsorAmount;


                console.log(sponsorAmount);


                dashboard.balance = JSON.stringify(parseFloat(dashboard.balance, 10) - parseFloat(placeWinlist.possiblyWin) - total);
                dashboard.totalUserBalance = JSON.stringify(parseFloat(dashboard.totalUserBalance, 10) + parseFloat(placeWinlist.possiblyWin) + sponsorAmount);
                dashboard.clubCommision = JSON.stringify(parseFloat(dashboard.clubCommision, 10) + clubAmount);
                dashboard.sponsorCommision = JSON.stringify(parseFloat(dashboard.sponsorCommision, 10) + sponsorAmount);

                club.amount = JSON.stringify(parseFloat(club.amount) + clubAmount);

                userInfo.username === sponsor.username ?
                    sponsor.amount = JSON.stringify(parseFloat(userInfo.amount) + sponsorAmount)
                    : sponsor.amount = JSON.stringify(parseFloat(sponsor.amount) + sponsorAmount);


                // await betdetails.save();
                // await userInfo.save();
                // await placeWinlist.save();
                // await dashboard.save();
                // await club.save();
                // await sponsor.save();
                console.log('yes0')
                await Promise.all(
                    [
                    betdetails.save(),
                    userInfo.save(),
                    placeWinlist.save(),
                    dashboard.save(),
                    club.save(),
                    sponsor.save(),
                    ])
                    console.log('yes1')
            }
            catch (e) {

            }
        })

        //lost update
        loseId.map(async (item, index) => {
            try {
                let placeWinlist = await PlaceBets.findById({ '_id': item });
                let dashboard = await Dashboard.findOne({ info: 'Yes' })

                placeWinlist.winStatus = 'Loss';

                await placeWinlist.save();
                await dashboard.save();

            }
            catch (e) {

            }
        })

        await Bets.findOneAndUpdate(
            { '_id': matchId },
            {
                $set: {
                    'questions.$[qid].isFinished': 'Yes',
                    'questions.$[qid].options.$[oid].winStatus': 'Win',
                }
            },
            { arrayFilters: [{ 'qid._id': questionId }, { 'oid._id': optionId }] }
        )

        return res.status(200).json({
            flashMessage: "Successfully added your option"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}

const cancelBetPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { questionId, optionId, placeBetId } = req.body
    try {
        let placebets = await PlaceBets.findByIdAndUpdate({ '_id': placeBetId })
        console.log('yes');
        await Bets.findByIdAndUpdate(
            { '_id': matchId },
            { $pull: { 'questions.$[qid].options.$[oid].userId': placeBetId } },
            { arrayFilters: [{ 'qid._id': questionId }, { 'oid._id': optionId }] }
        )
        placebets.winStatus = 'Cancel';
        await placebets.save();

    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }

}


module.exports = { winPostController, cancelBetPostController }




const findingInfomations = (betInfo, questionId, optionId) => {

    let winId = [];
    let lossId = []
    betInfo.questions.map(item => {

        if (item._id == questionId) {
            item.options.length && item.options.map(it => {
                if (it._id == optionId) {
                    winId = it.userId;
                }
                else {
                    lossId = [...lossId, ...it.userId]
                }
            })
        }
    })
    return {
        winId,
        lossId
    }
}
