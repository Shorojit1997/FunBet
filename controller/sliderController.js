const SliderImages = require('../models/SliderImage');
const UploadImage=require('../models/UploadImage')


const getUserSlider = async (req, res, next) => {
    try {
        const sliderImage = await SliderImages.find({});
        res.status(200).json({
            sliderImage
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminSliderPostController = async (req, res, next) => {
   let pictureUrl = req.params.slug;
    try {
        let pic=await UploadImage.findById(pictureUrl)
        let slider = new SliderImages({
            pictureUrl: pic.pictureUrl
        })
        await slider.save();
        res.status(200).json({
            flashMessage: 'Save Successfully '
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }
}

const adminSliderDeleteController = async (req, res, next) => {
    let picId = req.params.slug;
    try {
        await SliderImages.findByIdAndDelete({ '_id': picId })
        res.status(200).json({
            flashMessage: 'Save Successfully '
        })

    }
    catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }
}

module.exports = { getUserSlider, adminSliderPostController, adminSliderDeleteController }