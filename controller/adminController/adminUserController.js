const User = require('../../models/User')
const adminUserInfoValidator = require('../../validator/adminUserEditValidator')
const dateformat = require('dateformat')
const bcrypt = require('bcrypt');

const adminUserListGetController = async (req, res, next) => {
    try {
        let oldList = await User.find({}).limit(1000).sort({'_id':-1});

        let userList = oldList.map((item, index) => {
            let ob = {
                col1: index + 1,
                col2: item.name,
                col3: item.username,
                col4: item.phone,
                col5: item.email,
                col6: item.sponsorName,
                col7: item.clubName,
                col8:item._id,
                col9: item.amount,
                col10: dateformat(item.createdAt, "dd-mm-yy, h:MM TT"),
                col11: item.activeStatus,
                col12: {
                    _id: item._id,
                    activeStatus: item.activeStatus,
                    username: item.username,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    sponsorName: item.sponsorName,
                    clubName: item.clubName,
                },
            }
            return ob;
        })
        return res.status(200).json({
            userList: userList
        })

    } catch (e) {
        return res.status(404).json({
            flashMessage: 'Something happed error please try again.'
        })
    }

}

const adminUserActiveStatusPostController = async (req, res, next) => {
    const userId = req.params.slug;
    try {
        let userList = await User.findByIdAndUpdate({ _id: userId });
        if (userList.activeStatus === 'Active')
            userList.activeStatus = 'Inactive'
        else if (userList.activeStatus === 'Inactive')
            userList.activeStatus = 'Active'
        await userList.save();
        return res.status(200).json({
            userList: userList
        })

    } catch (e) {
        return res.status(404).json({
            flashMessage: 'Something happed error please try again.'
        })
    }

}


const adminEditUserInfoPostController = async (req, res, next) => {
    const userId = req.params.slug;
    const { name, phone, email, username, password, confirmPassword, clubName, sponsorName } = req.body;
    // data validation checker
    
    let error = adminUserInfoValidator({ name, phone, email, username, password, confirmPassword, clubName, sponsorName })


    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            flashMessage: 'Please fill up your informations..'
        })
    }
    try {
        let hashPassword;
        if (password) hashPassword = await bcrypt.hash(password, 11);
        let user = await User.findByIdAndUpdate({ _id: userId });
        user.name = name;
        user.username = username;
        if (password) user.password = hashPassword;
       
        user.clubName = clubName;
        user.sponsorName = sponsorName;
        await user.save();
       
        // const token = await jwt.sign({ email }, secretToken, { expiresIn: '2h' });

        // let authInformation = {
        //     name: name,
        //     phone: phone,
        //     username: username,
        //     email: email,
        //     clubName: clubName,
        //     sponsorName: sponsorName,
        //     amount: req.user.amount
        // };

        return res.status(200).json({
            // isUserLogin: true,
            flashMessage: 'Succesfully updated your account..',
            // token,
            // authInformation
        })

    } catch (e) {
        res.status(400).json({
            // isUserLogin: false,
            flashMessage: 'Somethings happend error..'
        })
    }

}


module.exports = {
    adminEditUserInfoPostController,
    adminUserActiveStatusPostController,
    adminUserListGetController
}