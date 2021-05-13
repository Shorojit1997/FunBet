const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var dateFormat = require("dateformat");


// local files 
const signupErrorChecker = require('../validator/signupValidator')
const loginErrorChecker = require('../validator/loginValidator')
const Clubinfo = require('../models/Clubinfo')
const User = require('../models/User')
const Dashboard = require('../models/Dashboard');
const PromoCode = require('../models/PromoCode')
const { secretToken, refressToken } = require('../AppToken/AppToken');


const signupGetController = (req, res, next) => {
    res.status(200).json({
        flashMessage: 'Nothing happend'
    })
}
//signup controller
const signupPostController = async (req, res, next) => {
    const { name, phone, email, username, password, confirmPassword, clubName, sopnsorName, promocode } = req.body;

    // data validation checker
    
    let error = signupErrorChecker({ name, phone, email, username, password, confirmPassword, clubName, sopnsorName });
    console.log(error);
    if (Object.keys(error).length !== 0) {
        error.flashMessage = 'Please fill up your informations..'
        return res.status(401).json({
            isSignup: false,
            ...error
        })
    }
    try {
        //find club

        let clubinfo = await Clubinfo.findOne({ 'clubName': clubName })
        //  email copy cheker 
        let findEmail = await User.findOne({ email })
        let dashboard = await Dashboard.findOneAndUpdate({ info: 'Yes' })
        if (findEmail) {
            error.flashMessage = 'Email is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }

        // number copy cheker 
        let findNumber = await User.findOne({ phone })
        if (findNumber) {
            error.flashMessage = 'Phone number is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }
        //  username copy cheker 

        let findUsername = await User.findOne({ username })
        if (findUsername) {
            error.flashMessage = 'Username is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }
        let promo = await PromoCode.findOne({ promocode })
        if (!promo) {
            error.flashMessage = 'Please provide valid security code.'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }

        // password hashing 
        const hashPassword = await bcrypt.hash(password, 11);
        dashboard.totalUser = JSON.stringify(parseInt(dashboard.totalUser) + 1);


        // user schema assign 
        let user = new User({
            name,
            phone,
            email,
            username,
            password: hashPassword,
            clubName,
            sponsorName: sopnsorName
        })
        // save into user database 
        clubinfo.userlist.push(user._id);
        await clubinfo.save();
        await dashboard.save();
        await user.save();


        // passing from front end 
        return res.status(200).json({
            isSignup: true,
            flashMessage: 'Succesfully created your account..'
        })

    } catch (e) {
        res.status(400).json({
            isSignup: false,
            flashMessage: 'Somethings happend error..'
        })
    }

}

//edit controlelr 
const editUserInfoPostController = async (req, res, next) => {
    const { name, phone, email, username, password, confirmPassword, clubName, sponsorName } = req.body;
   
    if (!name || !clubName || !sponsorName ) {
        error.flashMessage = 'Please fill up your informations..'
        return res.status(401).json({
            isSignup: false,
        })
    }
    try {

        let clubinfo = await Clubinfo.findOne({ 'clubName': clubName });
        let user = await User.findOne({ _id: req.user._id });
        let clubinfo1 = await Clubinfo.findOne({ 'clubName': user.clubName });

        user.name = name;
        user.username = username;
        if (password && password===confirmPassword)
            user.password = await bcrypt.hash(password, 11);;
        user.clubName = clubName;
        user.sponsorName = sponsorName;

        clubinfo.userlist.push(user._id);
        clubinfo1.userlist.pull(user._id)
        await clubinfo.save();
        await clubinfo1.save();
        await user.save();

        const token = await jwt.sign({ email }, secretToken, { expiresIn: '7d' });
        let authInformation = {
            name: name,
            phone: phone,
            username: username,
            email: email,
            clubName: clubName,
            sponsorName: sponsorName,
            amount: req.user.amount
        };

        return res.status(200).json({
            isUserLogin: true,
            flashMessage: 'Succesfully updated your account..',
            token,
            authInformation
        })

    } catch (e) {
        res.status(400).json({
            isUserLogin: false,
            flashMessage: 'Somethings happend error..'
        })
    }

}

const loginGetController = async (req, res, next) => {

    try {

        if (req.session.isUserLogin) {
            let user = await User.findById(req.session.user._id)
            const { name, phone, username, email, clubName, sponsorName, amount } = user;
            return res.status(200).json({
                isUserLogin: true,
                authInformation: { name, phone, username, email, clubName, sponsorName, amount }
            })
        } else {
            return res.status(200).json({
                isUserLogin: false,
                authInformation: {}
            })
        }
    }
    catch (e) {
        res.status(400).json({
            isUserLogin: false,
            flashMessage: 'Somethings happend error..'
        })
    }


}
const loginPostController = async (req, res, next) => {
    const { email, password, remember, promocode } = req.body;

    // form data validation 
    let error = loginErrorChecker({ email, password })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            isLogin: false,
        })
    }
    try {
        //check riht promocode
        const isCode = await PromoCode.findOne({ promocode: promocode });
        if (!isCode) {
            return res.status(401).json({
                isUserLogin: false,
                flashMessage: 'Please provide valid promocode'
            })
        }
        //user checker 
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(401).json({
                isUserLogin: false,
                flashMessage: 'Please provide valid credentials'
            })
        }

        // matching password 
        const isMatch = await bcrypt.compare(password, isUser.password)

        if (isMatch) {

            let expireDate = '7d';
            if (remember === 'on') expireDate = '30d'
            const { name, phone, username, email, clubName, sponsorName, amount } = isUser;
            const token = await jwt.sign({ email }, secretToken, { expiresIn: expireDate });

            req.session.user = isUser;
            req.session.isUserLogin = true;
            req.session.save((err) => {
                if (err)
                    return next(err);
            })
            return res.status(201).json({
                isUserLogin: true,
                token,
                authInformation: { name, phone, username, email, clubName, sponsorName, amount, },
            })
        }
        else {
            return res.status(404).json({
                isUserLogin: false,
                flashMessage: 'Please provide valid credentials'
            })
        }

    }
    catch (e) {
        return res.status(404).json({
            isUserLogin: false,
            flashMessage: 'Please provide valid credentials'
        })
    }



}

const logoutPostController = async (req, res, next) => {

    try {
        await req.session.destroy();
        res.status(200).json({
            flashMessage: 'Logout succcessfull'
        })
    }
    catch (e) {

    }

}


module.exports = {
    signupGetController,
    signupPostController,
    editUserInfoPostController,
    loginGetController,
    loginPostController,
    logoutPostController
}