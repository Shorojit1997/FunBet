const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const Admin = require('../../models/Admin')
const User = require('../../models/User');
const Club=require('../../models/Clubinfo')

const adminSignupErrorChecker = require('../../validator/adminSignupValidator')
const loginErrorChecker = require('../../validator/loginValidator')
const { secretToken } = require('../../AppToken/AppToken')

const adminSignupGetController = (req, res, next) => {

}


const adminSignupPostController = async (req, res, next) => {

    const { name, phone, email, username, password, confirmPassword, role, activeStatus } = req.body;

    // data validation checker
    let error = adminSignupErrorChecker({ name, phone, email, username, password, confirmPassword, role, activeStatus })
    if (Object.keys(error).length !== 0) {


        return res.status(401).json({
            isSignup: false,
            error: { ...error }
        })
    }
    try {
        //  email copy cheker 
        let findEmail = await Admin.findOne({'email': email })
        if (findEmail) {
            error.flashMessage = 'Email is already in used'
            return res.status(401).json({
                isSignup: false,
                error: { ...error }
            })
        }

        // number copy cheker 
        let findNumber = await Admin.findOne({'phone': phone })
        if (findNumber) {
            error.flashMessage = 'Phone number is already in used'
            return res.status(401).json({
                isSignup: false,
                error: { ...error }
            })
        }

        //  username copy cheker 

        let findUsername = await Admin.findOne({ 'username':username })
        if (findUsername) {
            error.flashMessage = 'Username is already in used'
            return res.status(401).json({
                isSignup: false,
                error: { ...error }
            })
        }
        // password hashing 
        const hashPassword = await bcrypt.hash(password, 11);

        // user schema assign 
        let admin = new Admin({
            name,
            phone,
            email,
            username,
            password: hashPassword,
            role,
            activeStatus
        })
        // save into user database 
        await admin.save();

        // passing from front end 
        return res.status(200).json({
            isSignup: true,
            flashMessage: 'Congratulations '
        })

    } catch (e) {
        res.status(400).json({
            isSignup: false,
            flashMessage: 'Somethings happend error..'
        })
    }
}

// admin edit controlle 
const adminEditPostController = async (req, res, next) => {
    const adminId = req.params.slug;

    const { name, phone, email, username, password, confirmPassword, role, activeStatus, oldPassword } = req.body;

    // data validation checker
    let error = adminSignupErrorChecker({ name, phone, email, username, password, confirmPassword, role, activeStatus })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            flashMessage: 'Please try again with valid informations'
        })
    }

    try {
        const checkPass = await bcrypt.compare(oldPassword, req.admin.password)
        let hashPassword;
        if (checkPass)
            hashPassword = await bcrypt.hash(password, 11);
        else {
            return res.status(401).json({
                flashMessage: 'Please try again with valid informations'
            })
        }

        // user schema assign 
        const admininfo = await Admin.findByIdAndUpdate({ _id: adminId })
        if (name)
            admininfo.name = name;
        if (username)
            admininfo.username = username
        if (phone)
            admininfo.phone = phone
        if (email)
            admininfo.email = email;
        if (password)
            admininfo.password = hashPassword;
        // save into user database 
        await admininfo.save();

        // passing from front end 
        return res.status(200).json({
            flashMessage: 'Congratulations '
        })

    } catch (e) {
        res.status(400).json({
            flashMessage: 'Somethings happend error..'
        })
    }
}

const adminLoginGetController = (req, res, next) => {


}
const adminLoginPostController = async (req, res, next) => {
    const { email, password, remember } = req.body;

    // form data validation 
    let error = loginErrorChecker({ email, password })
    if (Object.keys(error).length !== 0) {
        return res.status(201).json({
            isLogin: false,
            error: { ...error }
        })
    }
    //user checker 
    const isAdmin = await Admin.findOne({ email });
    if (!isAdmin) {
        return res.status(404).json({
            isLogin: false,
            flashMessage: 'Please provide valid credentials'
        })
    }

    // matching password 
    const isMatch = await bcrypt.compare(password, isAdmin.password)

    if (isMatch) {

        let expireDate = '12h';
        if (remember === 'on') expireDate = '7d'
        const token = await jwt.sign({ email, phone: isAdmin.phone }, secretToken, { expiresIn: expireDate });
        //session storing 
        req.session.admin = isAdmin;
        req.session.isAdminLogin = true;
        req.session.save((err) => {
            if (err)
                return next(err);
        })

        return res.status(201).json({
            isAdminLogin: true,
            token,
            role: isAdmin.role,
            username: isAdmin.username
        })
    }
    return res.status(404).json({
        isAdminLogin: false,
        flashMessage: 'Please provide valid credentials'
    })


}

const adminLogoutController = async (req, res, next) => {
    await req.session.destroy();
    res.status(200).json({
        flashMessage: 'Logout succcessfull'
    })

}
const isAdminLoginGetController = async (req, res, next) => {
    if (req.session.isAdminLogin) {
        return res.status(200).json({
            isAdminLogin: true
        })
    } else {
        return res.status(200).json({
            isAdminLogin: false
        })
    }

}

const adminDetailsGetController = async (req, res, next) => {
    try {
        const adminlist = await Admin.find({});
        res.status(200).json({
            adminList: adminlist
        })

    } catch (e) {
        return res.status(404).json({
            flashMessage: 'Something happed error please try again.'
        })
    }
}

const adminActiveStatusPostController = async (req, res, next) => {
    const adminId = req.params.slug;

    try {
        let adminInfo = await Admin.findByIdAndUpdate({ _id: adminId });

        if (req.admin.role === 'Super_admin') {
            if (adminInfo.activeStatus === 'Active') {
                adminInfo.activeStatus = 'Inactive'
            }
            else if (adminInfo.activeStatus === 'Inactive') {
                adminInfo.activeStatus = 'Active';
            }
        }
        else if (req.admin._id === adminInfo._id) {
            if (adminInfo.activeStatus === 'Active') {
                adminInfo.activeStatus = 'Inactive'
            }
            else if (adminInfo.activeStatus === 'Inactive') {
                adminInfo.activeStatus = 'Active';
            }
        }
        await adminInfo.save();

        res.status(200).json({
            flashMessage: 'Successfully updated admin status.'
        })

    } catch (e) {
        return res.status(404).json({
            flashMessage: 'Something happed error please try again.'
        })
    }
}

const adminDeletePostController = async (req, res, next) => {
    const adminId = req.params.slug;

    try {
        console.log(req.admin.role);
        if (req.admin.role === 'Super_admin') {
            await Admin.findByIdAndDelete({ _id: adminId });
            res.status(200).json({
                flashMessage: 'Successfully remove from admin.'
            })
        }
        else {
            return res.status(404).json({
                flashMessage: 'Only super admin can remove admin.'
            })
        }
    } catch (e) {
        return res.status(404).json({
            flashMessage: 'Something happed error please try again.'
        })
    }
}



const userVisitingGetController=async(req,res,next)=>{
     let userId=req.params.slug;
    try{
        let user=await User.findById(userId);
        const { name, phone, username, email, clubName, sponsorName, amount } = user;
        req.session.user=user;
        req.session.isUserLogin = true;
        return res.status(201).json({
            isUserLogin: true,
            authInformation: { name, phone, username, email, clubName, sponsorName, amount, },
        })

    }catch(e){
        return res.status(404).json({
            isUserLogin: false,
            flashMessage: 'Something happed error please try again.'
        })
    }
}

const clubVisitingGetController=async(req,res,next)=>{
    let userId=req.params.slug;
   try{
       let club=await Club.findById(userId);
       const { name, phone, email, clubName, amount } = club;
       req.session.club=club;
       req.session.isClubLogin = true;
       return res.status(201).json({
           isClubLogin: true,
           authInformation: { name, phone,  email, clubName,amount },
       })

   }catch(e){
       return res.status(404).json({
          isClubLogin: false,
           flashMessage: 'Something happed error please try again.'
       })
   }
}


module.exports = {
    adminEditPostController,
    adminDeletePostController,
    adminActiveStatusPostController,
    adminDetailsGetController,
    isAdminLoginGetController,
    adminLoginGetController,
    adminLoginPostController,
    adminSignupGetController,
    adminSignupPostController,
    adminLogoutController,
    userVisitingGetController,
    clubVisitingGetController
}