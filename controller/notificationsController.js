
const Notifications = require('../models/Notifications')




const adminNotificationsGetController = async (req, res, next) => {

    try {
        let notifications = await Notifications.find({}).limit(100).sort({ '_id': -1 });
        res.status(200).json({
            notifications
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}
const userNotificationsGetController = async (req, res, next) => {

    try {
        let notifications = await Notifications.find({}).limit(10).sort({ '_id': -1 });
        res.status(200).json({
            notifications
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminNotificationsPostController = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({
            flashMessage: 'Please fill title and descriptions.'
        })
    }

    try {

        let notifications = new Notifications({
            title: title,
            description: description
        })

        await notifications.save();
        let notify = await Notifications.find({}).limit(100).sort({ '_id': -1 });

        res.status(200).json({
            notifications: notify,
            flashMessage: 'Successfully added notifications'
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminNotificationsEditController = async (req, res, next) => {
    const notifiId = req.params.slug;
    const { title, description } = req.body;


    try {
        let notifications = await Notifications.findByIdAndUpdate({ _id: notifiId })
        if (title) notifications.title = title;
        if (description) notifications.description = description

        await notifications.save();
        res.status(200).json({
            flashMessage: 'Successfully updated notifications'
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminNotificationsDeleteController = async (req, res, next) => {
    const notifiId = req.params.slug;


    try {
        await Notifications.findByIdAndDelete({ _id: notifiId })
        res.status(200).json({
            flashMessage: 'Successfully deleted'
        })
    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Please try again'
        })
    }
}

module.exports={
    userNotificationsGetController,
    adminNotificationsGetController,
    adminNotificationsPostController,
    adminNotificationsEditController,
    adminNotificationsDeleteController
}


