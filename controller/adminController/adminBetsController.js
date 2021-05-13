const Bets = require('../../models/Bets');
const AutoStack = require('../../models/AutoStack');
const AutoStackName = require('../../models/AutoStackName');
const GameType =require('../../models/GameType')
const PlaceBets = require('../../models/PlaceBets')

const { matchSetValidator, optionSetValidator } = require('../../validator/adminBetValidator')

//add match
const setMatchPostController = async (req, res, next) => {

    const { teamA, teamB, playStatus, gameType, turnamentName, gameDate, gameTime, stackNumber, stackName } = req.body

    let error = matchSetValidator({ teamA, teamB, playStatus, gameType, turnamentName, gameDate, gameTime });


    if (Object.keys(error).length !== 0) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }

    try {
        const austackName = await AutoStackName.findOne({ "name": stackName });
        let questionaries = await AutoStack.find({ _id: { $in: austackName.questionsId } });
        let gameTypePic=await GameType.findOne({name:gameType});

        let numberOfquestions = [];
        if (parseInt(stackNumber, 10))
            numberOfquestions = questionaries.slice(0, Math.min(questionaries.length, parseInt(stackNumber)))
        const bets = new Bets({
            teamA,
            teamB,
            playStatus,
            gameType,
            picsUrl:gameTypePic.picsUrl,
            turnamentName,
            gameDate,
            gameTime,
            questions: numberOfquestions
        })

        await bets.save();
        return res.status(200).json({
            flashMessage: "Successfully placed match",
        })
    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",

        })
    }
}


//edit match
const editMatchPostController = async (req, res, next) => {

    const { teamA, teamB, playStatus, gameType, turnamentName, gameDate, gameTime } = req.body
    const matchId = req.params.slug;

    let error = matchSetValidator({ teamA, teamB, playStatus, gameType, turnamentName, gameDate, gameTime });
    if (Object.keys(error).length !== 0 || !matchId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
            error,
        })
    }

    try {

        let bets = await Bets.findByIdAndUpdate(matchId)
        if (teamA)
            bets.teamA = teamA;
        if (teamB)
            bets.teamB = teamB;
        if (playStatus)
            bets.playStatus = playStatus;
        if (gameType)
            bets.gameType = gameType
        if (turnamentName);
        bets.turnamentName = turnamentName;
        if (gameDate)
            bets.gameDate = gameDate;
        if (gameTime)
            bets.gameTime = gameTime;
        await bets.save();
        return res.status(200).json({
            flashMessage: "Successfully updated match informations",
        })
    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
            error,
        })
    }
}
//add questions

const addQuestionsPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { questionName } = req.body;
    if (!questionName || !matchId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        let upBates = await Bets.findByIdAndUpdate({ _id: matchId });
        upBates.questions.push({ "question": questionName })
        await upBates.save();
        return res.status(200).json({
            flashMessage: "Successfully added your question"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
            error,
        })
    }

}

// edit question 
const editQuestionsPostController = async (req, res, next) => {
    const matchId = req.params.slug;

    const { questionName, questionId } = req.body;
    if (!questionName || !matchId || !questionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId, "questions._id": questionId },
            { $set: { "questions.$.question": questionName } },
        );


        return res.status(200).json({
            flashMessage: "Successfully updated your question"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
// delete questions
const deleteQuestionsPostController = async (req, res, next) => {
    const matchId = req.params.slug;

    const { questionId } = req.body;
    if (!matchId || !questionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId },
            { $pull: { "questions": { '_id': questionId } } },
        );


        return res.status(200).json({
            flashMessage: "Successfully updated your question"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
// show  questions
const showQuestionsPostController = async (req, res, next) => {
    const matchId = req.params.slug;

    const { questionId } = req.body;
    if (!matchId || !questionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId },
            { $set: { "questions.$[qid].isShow": 'Show' } },
            { arrayFilters: [{ 'qid._id': questionId }] }
        );


        return res.status(200).json({
            flashMessage: "Successfully updated your question"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
// hide  questions

const hideQuestionsPostController = async (req, res, next) => {
    const matchId = req.params.slug;

    const { questionId } = req.body;
    if (!matchId || !questionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId },
            { $set: { "questions.$[qid].isShow": 'Hide' } },
            { arrayFilters: [{ 'qid._id': questionId }] }
        );


        return res.status(200).json({
            flashMessage: "Successfully updated your question"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}

// add option 
const addOptionPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { rating, option, questionId } = req.body;
    const error = optionSetValidator({ rating, option });

    if (Object.keys(error).length !== 0) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
            error
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId, "questions._id": questionId },
            { $push: { "questions.$.options": { "rating": rating, "option": option } } },
        );
        // await Bets.findOneAndUpdate(
        //     { _id: matchId },
        //     { $push: { 'questions.$[qid].options': { "rating": rating, "option": option } } },
        //     { arrayFilters: [{ 'qid._id': questionId }] })
        // console.log('yes')

        return res.status(200).json({
            flashMessage: "Successfully added your option"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",

        })
    }
}

// edit option 
const editOptionPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { rating, option, questionId, optionId } = req.body;
    const error = optionSetValidator({ rating, option });

    if (Object.keys(error).length !== 0 || !optionId || !questionId || !matchId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId },
            { $set: { "questions.$[qId].options.$[opId]": { "rating": rating, "option": option } } },
            { arrayFilters: [{ "qId._id": questionId }, { "opId._id": optionId }] }
        );

        return res.status(200).json({
            flashMessage: "Successfully added your option"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
//delete options


const deleteOptionPostController = async (req, res, next) => {
    const matchId = req.params.slug;
    const { questionId, optionId } = req.body;

    if (!matchId || !questionId || !optionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations",
        })
    }
    try {
        await Bets.findOneAndUpdate(
            { _id: matchId },
            { $pull: { "questions.$[qId].options": { '_id': optionId } } },
            { arrayFilters: [{ "qId._id": questionId }] }
        );

        return res.status(200).json({
            flashMessage: "Successfully added your option"
        })

    } catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}

const adminBetsGetController = async (req, res, next) => {
    try {
        const betsList = await Bets.find({
            $or:
                [{ playStatus: 'Live' },
                { playStatus: 'Upcomming' },
                { playStatus: 'Hidden' }]
        }).sort({ '_id': -1 }).lean();
        res.status(200).json({
            betsList: betsList,
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
//finished item get controller 

const adminFinishedItemGetController = async (req, res, next) => {
    try {
        const finishedList = await Bets.find({ playStatus: 'Finished' }).sort({ '_id': -1 })
        res.status(200).json({
            finishedList: finishedList,
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}


//finging single element
const adminBetsSingleElementController = async (req, res, next) => {
    const matchId = req.params.slug;
    try {
        const singleElement = await Bets.findById({ _id: matchId })
        res.status(200).json({
            singleElement: singleElement,
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}

const adminBetsChangeStatusPostController = async (req, res, next) => {
    const betId = req.params.slug;
    try {
        let betInfo = await Bets.findByIdAndUpdate({ _id: betId });

        if (betInfo.playStatus === 'Live') {
            betInfo.playStatus = 'Upcomming'
        }
        else if (betInfo.playStatus === 'Upcomming') {
            betInfo.playStatus = 'Live';
        }
        await betInfo.save();

        return res.status(200).json({
            flashMessage: 'Successfully eddited status'
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
//hidden bets

const adminBetsHiddenPostController = async (req, res, next) => {
    const betId = req.params.slug;
    try {
        let betInfo = await Bets.findByIdAndUpdate({ _id: betId });
        if (betInfo.playStatus === 'Hidden')
            betInfo.playStatus = 'Live'
        else if (betInfo.playStatus !== 'Finished') {
            betInfo.playStatus = 'Hidden'
        }

        await betInfo.save();

        return res.status(200).json({
            flashMessage: 'Successfully eddited status'
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
//finished bets list

const adminBetsFinishedPostController = async (req, res, next) => {
    const betId = req.params.slug;
    try {
        let betInfo = await Bets.findByIdAndUpdate({ _id: betId });
        betInfo.playStatus = 'Finished'
        await betInfo.save();

        return res.status(200).json({
            flashMessage: 'Successfully eddited status'
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}


//delete bets
const adminBetsDeletePostController = async (req, res, next) => {
    const betId = req.params.slug;
    try {
        await Bets.findByIdAndDelete({ _id: betId });

        return res.status(200).json({
            flashMessage: 'Successfully Deleted '
        })
    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}
const adminPlaceBetsGetController = async (req, res, next) => {
    try {
        const placeBets=await PlaceBets.find({}).sort({'_id':-1});
        res.status(200).json({
            placeBetsList:placeBets
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again",
        })
    }
}







const adminBetsPostController = async (req, res, next) => {
}



module.exports =
{
    addOptionPostController,
    editOptionPostController,
    deleteOptionPostController,

    editQuestionsPostController,
    deleteQuestionsPostController,
    showQuestionsPostController,
    addQuestionsPostController,
    hideQuestionsPostController,
    adminBetsGetController,
    adminFinishedItemGetController,
    // adminUpcommingBetsGetController,
    adminBetsPostController,
    setMatchPostController,
    editMatchPostController,

    adminBetsSingleElementController,
    adminBetsFinishedPostController,
    adminBetsChangeStatusPostController,
    adminBetsHiddenPostController,
    adminBetsDeletePostController,


    adminPlaceBetsGetController
}