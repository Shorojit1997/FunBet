
const GeneralSettings = require('../../models/GeneralSettings');
const ColorSettings = require('../../models/ColorSettings')


const generalSettingsPostController = async (req, res, next) => {
    const { title, email, phone, year, copyWriteText, websiteName, noticeText, logoUrl } = req.body;
    let settings = new GeneralSettings({

    })

    try {
        let generalSettings = await GeneralSettings.findOneAndUpdate({ searchTag: 'settings' })
        if (!generalSettings)
            await settings.save();
        else {
            if (title) generalSettings.title = title
            if (email) generalSettings.email = email
            if (phone) generalSettings.phone = phone
            if (year) generalSettings.year = year
            if (copyWriteText) generalSettings.copyWriteText = copyWriteText
            if (websiteName) generalSettings.websiteName = websiteName
            if (noticeText) generalSettings.noticeText = noticeText
            if (logoUrl) generalSettings.logoUrl = logoUrl
            await generalSettings.save();
        }
        res.status(200).json({
            flashMessage: 'Updated successfully',
            generalSettings
        })
    } catch {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }


}

const generalSettingsGetController = async (req, res, next) => {

    let settings = new GeneralSettings({

    })

    try {
        let generalSettings = await GeneralSettings.findOneAndUpdate({ searchTag: 'settings' })
        if (!generalSettings)
            await settings.save();

        res.status(200).json({
            flashMessage: 'Updated successfully',
            generalSettings
        })

    } catch {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }


}


//color settings 
const colorSettingsPostController = async (req, res, next) => {
   
    const {
        userBackground,
        userNavBackground,
        userNavTextColor,
        userNavTextActiveColor,
        userFooterBackground,
        userFooterTextColor,
        userFooterFontsize,
        userButtonColor,
        userButtonFontSize,
        adminBackground,
        adminNavBackground,
        adminNavTextColor,
        adminNavTextActiveColor,
        adminFooterBackground,
        adminFooterTextColor,
        adminFooterFontsize,
        adminButtonColor,
        adminButtonFontSize

    } = req.body;
    let settings = new ColorSettings({

    })

    try {
        let colorSettings = await ColorSettings.findOneAndUpdate({ searchTag: 'settings' })
        if (!colorSettings)
            await settings.save();
        else {

            if (userBackground) colorSettings.userBackground = userBackground;
            if (userNavBackground) colorSettings.userNavBackground = userNavBackground;
            if (userNavTextColor) colorSettings.userNavTextColor = userNavTextColor;
            if (userNavTextActiveColor) colorSettings.userNavTextActiveColor = userNavTextActiveColor;
            if (userFooterBackground) colorSettings.userFooterBackground = userFooterBackground;
            if (userFooterTextColor) colorSettings.userFooterTextColor = userFooterTextColor;
            if (userFooterFontsize) colorSettings.userFooterFontsize = userFooterFontsize;
            if (userButtonColor) colorSettings.userButtonColor = userButtonColor;
            if (userButtonFontSize) colorSettings.userButtonFontSize = userButtonFontSize;
            if (adminBackground) colorSettings.adminBackground = adminBackground;
            if (adminNavBackground) colorSettings.adminNavBackground = adminNavBackground;
            if (adminNavBackground) colorSettings.adminNavBackground = adminNavBackground;
            if (adminNavTextColor) colorSettings.adminNavTextColor = adminNavTextColor;
            if (adminNavTextActiveColor) colorSettings.adminNavTextActiveColor = adminNavTextActiveColor;
            if (adminFooterBackground) colorSettings.adminFooterBackground = adminFooterBackground;
            if (adminFooterTextColor) colorSettings.adminFooterTextColor = adminFooterTextColor;
            if (adminFooterFontsize) colorSettings.adminFooterFontsize = adminFooterFontsize;
            if (adminButtonColor) colorSettings.adminButtonColor = adminButtonColor;
            if (adminButtonFontSize) colorSettings.adminButtonFontSize = adminButtonFontSize;

            await colorSettings.save();
        }
        res.status(200).json({
            flashMessage: 'Updated successfully',
            colorSettings
        })
    } catch {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }
}

//color setting post controller 
const colorSettingsGetController = async (req, res, next) => {

    let settings = new GeneralSettings({

    })

    try {
        let colorSettings = await ColorSettings.findOneAndUpdate({ searchTag: 'settings' })
        if (!colorSettings)
            await settings.save();

        res.status(200).json({
            flashMessage: 'Updated successfully',
            colorSettings
        })

    } catch {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })
    }


}


module.exports = {
    colorSettingsPostController,
    colorSettingsGetController,
    generalSettingsPostController,
    generalSettingsGetController
}