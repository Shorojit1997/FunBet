
const { response } = require('express');
const AutoStack = require('../../models/AutoStack');
const AutoStackName = require('../../models/AutoStackName')


const autoStackNameGetController = async (req, res, next) => {
    try {
        const data = await AutoStackName.find();
        let stackName = data.map((item, index) => {
            let ob = {
                col1: index + 1,
                col2: item.name,
                col3: {
                    _id: item._id,
                    name: item.name
                }
            }
            return ob;
        })

        return res.status(200).json({
            stackName: stackName
        })


    }
    catch (error) {

        return res.status(400).json({
            flashMessage: "Please try again..."
        })

    }
}

const autoStackNamePostController = async (req, res, next) => {

    const { name } = req.body;

    try {

        let autostackname = new AutoStackName({
            name
        })
        await autostackname.save();
        return res.status(200).json({
            flashMessage: "Successfully added your stackname"
        })
    } catch (error) {

        return res.status(400).json({
            flashMessage: "Please try again..."
        })

    }
}

//edit autostackname 
const editAutoStackNamePostController = async (req, res, next) => {
    const stackNameId = req.params.slug;
    const { name } = req.body;
    if (!name || !stackNameId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations"
        })
    }

    try {

        let editname = await AutoStackName.findByIdAndUpdate({ _id: stackNameId })
        editname.name = name;
        await editname.save();
        return res.status(200).json({
            flashMessage: "Successfully eddited your stackname"
        })
    } catch (error) {

        return res.status(400).json({
            flashMessage: "Please try again..."
        })

    }
}

//autostack get controller

const autoStackGetController = async (req, res, next) => {
    const stackId = req.params.slug;

    if (!stackId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations"
        })
    }

    try {
        let stackname = await AutoStackName.findById({ _id: stackId })
        let questionsId = stackname.questionsId
        let stack = await AutoStack.find({ _id: { $in: questionsId } });

        return res.status(200).json({
            stack: stack
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}

//add autostack questions 
const autoStackPostController = async (req, res, next) => {
    const gameId = req.params.slug;

    const { questionName } = req.body;
    if (!gameId || !questionName) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations"
        })
    }
    try {
        let stackname = await AutoStackName.findByIdAndUpdate({ _id: gameId })
        let addQuestion = new AutoStack({
            question: questionName
        })
        const questionData = await addQuestion.save();
        stackname.questionsId.push(questionData._id);
        await stackname.save();

        return res.status(201).json({
            flashMessage: "Successfully added your question into stack"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}

//edit autostack questions 
const editAutoStackPostController = async (req, res, next) => {
    const questionId = req.params.slug;
    const { questionName } = req.body;
    if (!questionId || !questionName) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations"
        })
    }
    console.log('yes-1')
    try {
        let editQuestionName = await AutoStack.findByIdAndUpdate({ _id: questionId })
        editQuestionName.question = questionName
        await editQuestionName.save();

        return res.status(201).json({
            flashMessage: "Successfully eddited your question into stack"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}
//delete auto stack 

const deleteAutoStackPostController = async (req, res, next) => {
    const { gameId } = req.body;
    const questionId = req.params.slug;
    if (!gameId || !questionId) {
        return res.status(400).json({
            flashMessage: "Please provide valid informations"
        })
    }
    try {
        let stackname = await AutoStackName.findByIdAndUpdate({ _id: gameId });
        stackname.questionsId.pull(questionId);
        await stackname.save();
        await AutoStack.findByIdAndDelete({ _id: questionId });

        return res.status(201).json({
            flashMessage: "Successfully deleted question into stack"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}

//set options

const setAutoStackOptionPostController = async (req, res, next) => {
    const questionId = req.params.slug;
    const { rating, option } = req.body;
    if (!questionId || !rating || !option) {
        return res.status(200).json({
            flashMessage: "Please provide valid informations"
        })
    }
    try {
        let autostack = await AutoStack.findByIdAndUpdate(questionId)
        autostack.options.push({ rating, option });
        await autostack.save();

        return res.status(201).json({
            flashMessage: "Successfully added your option into question"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}


//edit options

const editAutoStackOptionPostController = async (req, res, next) => {

    const questionId = req.params.slug;
    const { optionId, rating, option } = req.body;
    if (!questionId || !rating || !option || !optionId) {
        return res.status(200).json({
            flashMessage: "Please provide valid informations"
        })
    }
    try {
        await AutoStack.findByIdAndUpdate(
            { _id: questionId },
            { $set: { "options.$[optionId]": { "rating": rating, "option": option } } },
            {
                arrayFilters: [{ "optionId._id": optionId }]
            }
        )

        return res.status(201).json({
            flashMessage: "Successfully edited your option into question"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}
//delete option 
const deleteAutoStackOptionPostController = async (req, res, next) => {

    const questionId = req.params.slug;
    const { optionId } = req.body;
    if (!questionId || !optionId) {
        return res.status(200).json({
            flashMessage: "Please provide valid informations"
        })
    }
    try {
        await AutoStack.findByIdAndUpdate(
            { _id: questionId },
            { $pull: { "options":{ '_id':optionId} } },
           
        )
        return res.status(201).json({
            flashMessage: "Successfully deleted your option into question"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}

const deleteAutoStackNamePostController = async (req, res, next) => {
    const stackId = req.params.slug;
    try {
        await AutoStackName.findByIdAndDelete({ _id: stackId })
        return res.status(201).json({
            flashMessage: "Successfully deleted your stackname"
        })
    }
    catch (error) {
        return res.status(400).json({
            flashMessage: "Please try again..."
        })
    }

}


module.exports = {
    setAutoStackOptionPostController,
    editAutoStackOptionPostController,
    deleteAutoStackOptionPostController,
    autoStackGetController,
    autoStackPostController,
    editAutoStackPostController,
    deleteAutoStackPostController,
    deleteAutoStackNamePostController,
    autoStackNameGetController,
    autoStackNamePostController,
    editAutoStackNamePostController
}

