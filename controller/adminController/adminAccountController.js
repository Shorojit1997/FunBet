
const AccountType = require('../../models/AccountType')
const accountTypeErrorChecker = require('../../validator/accountTypeValidator')

const adminAccountGetController = async (req, res, next) => {
    try{
        const accountInfo = await AccountType.find();
        res.status(201).json({
           accountInfo
        })
    }
    catch(e){
        return res.status(501).json({
            flashMessage: 'Somethings happend error please try again'
        })
    }
   
}

const adminAccountPostController = async (req, res, next) => {
    let { accountName, accountNumber } = req.body;
    
    accountName = accountName.trim();
    accountNumber = accountNumber.trim();
    const error = accountTypeErrorChecker({ accountName, accountNumber })
    if (Object.keys(error).length !== 0) {
        return res.status(401).json({
            flashMessage: 'Please try again with valid informations'
        })
    }
    try {
        let accountInfoUpload = new AccountType({
            accountName,
            accountNumber,
        })
        await accountInfoUpload.save();
        res.status(200).json({
            accountNumber,
            accountName
        })
    } catch (e) {
        return res.status(501).json({
            flashMessage: 'Somethings happend error please try again'
        })
    }
}

const adminAccountEditPostController = async (req, res, next) => {
    let { accountName, accountNumber } = req.body;
    let idnumber = req.params.slug;
    accountName = accountName.trim();
    accountNumber = accountNumber.trim();
    const error = accountTypeErrorChecker({ accountName, accountNumber })
    if (Object.keys(error).length !== 0 || !idnumber) {
        return res.status(401).json({
            errorMessage: 'Please try again with valid informations'
        })
    }

    try {
        let updateAcccount = await AccountType.findByIdAndUpdate(idnumber);
        updateAcccount.accountName = accountName;
        updateAcccount.accountNumber = accountNumber;
        await updateAcccount.save();

        res.status(200).json({
            accountNumber,
            accountName
        })
    } catch (e) {
        return res.status(501).json({
            flashMessage: 'Somethings happend error please try again'
        })
    }
}

const adminAccountDeletePostController = async (req, res, next) => {
    let accountId = req.params.slug;
    try {

        await AccountType.findByIdAndDelete({ _id: accountId });
        return res.status(200).json({
            flashMessage: 'This number in deleted successfully'
        })

    }
    catch (e) {
        return res.status(501).json({
            flashMessage: 'Somethings happend error please try again'
        })
    }

}
const adminAccountStatusChangePostController = async (req, res, next) => {
    let accountId = req.params.slug;
    try {

        let info=  await AccountType.findByIdAndUpdate({ _id: accountId });
        if(info.accountActiveStatus==='Active'){
            info.accountActiveStatus='Inactive'
        }
       else if(info.accountActiveStatus==='Inactive'){
            info.accountActiveStatus='Active'
        }
        await info.save();
        return res.status(200).json({
            flashMessage: 'This number in deleted successfully'
        })

    }
    catch (e) {
        return res.status(401).json({
            flashMessage: 'Somethings happend error please try again'
        })
    }

}



module.exports = {
    adminAccountGetController,
    adminAccountPostController,
    adminAccountEditPostController,
    adminAccountDeletePostController,
    adminAccountStatusChangePostController
}