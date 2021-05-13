const UploadImages = require('../models/UploadImage')
const GeneralSettings=require('../models/GeneralSettings')

let fs = require('fs')


const imageUploadGetController = async (req, res, next) => {

    try {
        const pictures = await UploadImages.find({});
        return res.status(200).json({
            pictures,
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again...'
        })
    }

}


const imageUploadPostController = async (req, res, next) => {

    const pathName = `/images/${req.file.filename}`
    try {
        const images = new UploadImages({
            pictureUrl: pathName
        })
        await images.save();
        return res.status(201).json({
            isUpload: true,
            flashMessage: 'Upload your picture successfully'
        })

    }
    catch (e) {
        return res.status(400).json({
            isUpload: false,
            flashMessage: 'Please try again...'
        })
    }

}


const imageUploadDeleteController = async (req, res, next) => {
    const pictureurl = req.params.slug;

    try {
        const pictures = await UploadImages.findByIdAndRemove(pictureurl)
        const error = fs.unlinkSync(`public/${pictures.pictureUrl}`);
        if (error) {
            return res.status(401).json({
                isDelete: false,
                flashMessage: 'Please try again...'
            })
        }

        return res.status(200).json({
            isDelete: true,
            flashMessage: 'Picture delete successfully'
        })
    }
    catch (e) {
        return res.status(401).json({
            isDelete: false,
            flashMessage: 'Please try again...'
        })
    }

}

// set title icon controller 
const titleIconPostController = async (req, res, next) => {
    const pictureurl = req.params.slug;
    try {
        const pictures = await UploadImages.findById(pictureurl);
        let settings=await GeneralSettings.findOneAndUpdate({'searchTag':'settings'})
        settings.logoUrl=pictures.pictureUrl;
        await settings.save();

        return res.status(200).json({
            flashMessage: 'Picture upload successfully'
        })
    }
    catch (e) {
        return res.status(401).json({
            isDelete: false,
            flashMessage: 'Please try again...'
        })
    }

}



module.exports = {
    imageUploadDeleteController,
    imageUploadPostController,
    imageUploadGetController,
    titleIconPostController
}