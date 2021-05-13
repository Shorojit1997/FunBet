const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


// local files 
const signupErrorChecker = require('../../validator/clubSignupValidator')
const loginErrorChecker = require('../../validator/loginValidator')
const Clubinfo = require('../../models/Clubinfo')
const Dashboard = require('../../models/Dashboard');
const { secretToken } = require('../../AppToken/AppToken');


//signup controller
const signupPostController = async (req, res, next) => {
    const { name, phone, email, username, password, confirmPassword, clubName } = req.body;

    // data validation checker
    let error = signupErrorChecker({ name, phone, email, clubName, password, confirmPassword })
    if (Object.keys(error).length !== 0) {
        error.flashMessage = 'Please fill up your informations..'
        return res.status(401).json({
            isSignup: false,
            ...error
        })
    }
    try {
        //  email copy cheker 
        let findEmail = await Clubinfo.findOne({ email })
        let dashboard = await Dashboard.findOne({ info: 'Yes' })
        if (findEmail) {
            error.flashMessage = 'Email is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }
        // number copy cheker 
        let findNumber = await Clubinfo.findOne({ phone })
        if (findNumber) {
            error.flashMessage = 'Phone number is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }
        //  username copy cheker 


        let findUsername = await Clubinfo.findOne({ clubName })
        if (findUsername) {
            error.flashMessage = 'Clubname is already in used'
            return res.status(401).json({
                isSignup: false,
                ...error
            })
        }

        // password hashing 
        const hashPassword = await bcrypt.hash(password, 11);
        dashboard.totalClub = JSON.stringify(parseInt(dashboard.totalClub) + 1);

        // user schema assign 
        let club = new Clubinfo({
            name,
            phone,
            email,
            password: hashPassword,
            clubName,
        })
        // save into user database 
        await dashboard.save();
        await club.save();
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
    // data validation checker
    let error = signupErrorChecker({ name, phone, email, username, password, confirmPassword, clubName, sponsorName })

    if (Object.keys(error).length !== 0) {
        error.flashMessage = 'Please fill up your informations..'
        return res.status(401).json({
            isSignup: false,
            ...error
        })
    }
    try {
        const hashPassword = await bcrypt.hash(password, 11);
        let user = await User.findOneAndUpdate({ _id: req.user._id });
        user.name = name;
        user.username = username;
        user.password = hashPassword;
        user.clubName = clubName;
        user.sponsorName = sponsorName;
        await user.save();

        const token = await jwt.sign({ email }, secretToken, { expiresIn: '2h' });
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
        if (req.session.isClubLogin) {
            let user = await Clubinfo.findById(req.session.club._id)
            return res.status(200).json({
                isClubLogin: true,
            })
        } else {
            return res.status(200).json({
                isClubLogin: false,
                authInformation: {}
            })
        }
    }
    catch (e) {
        res.status(400).json({
            isClubLogin: false,
            flashMessage: 'Somethings happend error..'
        })
    }


}
const loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    // form data validation 
    let error = loginErrorChecker({ email, password })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            isClubLogin: false,
        })
    }
    try {

        //user checker 
        const isUser = await Clubinfo.findOne({ email });
        if (!isUser) {
            return res.status(401).json({
                isClubLogin: false,
                flashMessage: 'Please provide valid credentials'
            })
        }

        // matching password 
        const isMatch = await bcrypt.compare(password, isUser.password)

        if (isMatch) {

            const { name, phone, email, clubName, amount,withdraw ,userlist,totalWithdraw} = isUser;
     
            
            const token = await jwt.sign({ email }, secretToken, { expiresIn: '12h' });
            req.session.club = isUser;
            req.session.isClubLogin = true;
            req.session.save((err) => {
                if (err)
                    return  new Error('Please provide valid credantials')
            })

            return res.status(201).json({
                isClubLogin: true,
                token,
                authInformation: { name, phone, email, clubName, amount,withdraw,userlist,totalWithdraw },
            })


        }
        else {
            return res.status(404).json({
                isClubLogin: false,
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
    signupPostController,
    editUserInfoPostController,
    loginGetController,
    loginPostController,
    logoutPostController
}