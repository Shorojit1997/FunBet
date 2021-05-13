const route = require('express').Router();
// local files 
const {
    adminAccountStatusChangePostController,
    adminAccountDeletePostController,
    adminAccountEditPostController,
    adminAccountGetController,
    adminAccountPostController } = require('../../controller/adminController/adminAccountController')
const {
    adminEditPostController,
    adminDeletePostController,
    adminActiveStatusPostController,
    adminDetailsGetController,

    isAdminLoginGetController,
    adminLoginGetController,
    adminLoginPostController,
    adminSignupGetController,
    adminSignupPostController,
    adminLogoutController ,
    userVisitingGetController,
    clubVisitingGetController

} = require('../../controller/adminController/authAdminController')
//deposit controller
const {
    adminDepositGetController,
    adminDepositPostController,
    adminRejectedDepositPostController,
    adminDeletedDepositPostController,
    adminDepositEditController,
    adminDepositDeleteController
} = require('../../controller/adminController/adminDepositController')

// transfer controller 
const {
    adminTransferGetController,
    adminTransferAcceptPostController,
    adminRejectedTransferPostController,
    adminDeletedTransferPostController
} = require('../../controller/adminController/adminTransferController')
//deposit controller 
const {
    adminWithdrawGetController,
    adminWithdrawAcceptPostController,
    adminWithdrawRejectPostController,
    adminWithdrawDeletePostController

} = require('../../controller/adminController/adminWithdrawController')



//place  bed controller

const {
    adminBetsDeletePostController,
    adminBetsHiddenPostController,
    adminBetsChangeStatusPostController,
    editOptionPostController,
    deleteOptionPostController,
    addOptionPostController,

    editQuestionsPostController,
    deleteQuestionsPostController,
    showQuestionsPostController,
    hideQuestionsPostController,
    addQuestionsPostController,

    setMatchPostController,
    editMatchPostController,

    adminFinishedItemGetController,
    adminBetsGetController,
    adminBetsSingleElementController,
    adminBetsFinishedPostController,
    adminBetsPostController,
    adminPlaceBetsGetController
} = require('../../controller/adminController/adminBetsController')
//stack controller

const {
    autoStackGetController,
    autoStackPostController,
    editAutoStackPostController,
    deleteAutoStackPostController,
    setAutoStackOptionPostController,
    editAutoStackOptionPostController,
    deleteAutoStackOptionPostController,
    autoStackNameGetController,
    autoStackNamePostController,
    editAutoStackNamePostController,
    deleteAutoStackNamePostController
} = require('../../controller/adminController/adminAutoStackController')


// image upload routes 
const {
    imageUploadDeleteController,
    titleIconPostController,
    imageUploadPostController,
    imageUploadGetController
} = require('../../controller/imageController')

const {
    adminEditUserInfoPostController,
    adminUserActiveStatusPostController,
    adminUserListGetController
} = require('../../controller/adminController/adminUserController')

const {
    winPostController,
    cancelBetPostController
} = require('../../controller/adminController/adminWinController')
const {
    adminDashboardGetController
} = require('../../controller/adminController/adminDashboardController')

const {
    colorSettingsPostController,
    colorSettingsGetController,
    generalSettingsGetController,
    generalSettingsPostController
} = require('../../controller/adminController/adminSettingsController')

const {adminSliderPostController,adminSliderDeleteController}=require('../../controller/sliderController');

const {financeGetController,adminFinancePostController}=require('../../controller/adminController/adminFinancialController')

const { loginAdminBinding } = require('../../middleware/LoginUserBinding')
const { authenticateJWT, isAdminAuthenticated } = require('../../middleware/authenticateCheacker')
const uploads = require('../../middleware/uploadMiddleware')
const authetiCateMiddleware = [authenticateJWT, isAdminAuthenticated]


//finace controller
route.get('/finance', ...authetiCateMiddleware, loginAdminBinding, financeGetController)
route.post('/finance', ...authetiCateMiddleware, loginAdminBinding, adminFinancePostController)

//auto stack router
route.get('/bets/autostackname', ...authetiCateMiddleware, loginAdminBinding, autoStackNameGetController)
route.post('/bets/autostackname', ...authetiCateMiddleware, loginAdminBinding, autoStackNamePostController)
route.post('/bets/edit_autostackname/:slug', ...authetiCateMiddleware, loginAdminBinding, editAutoStackNamePostController)
route.post('/bets/delete_autostackname/:slug', ...authetiCateMiddleware, loginAdminBinding, deleteAutoStackNamePostController)


route.get('/bets/autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, autoStackGetController)
route.post('/bets/autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, autoStackPostController)
route.post('/bets/edit_autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, editAutoStackPostController)
route.post('/bets/delete_autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, deleteAutoStackPostController)

route.post('/bets/setoption_autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, setAutoStackOptionPostController)
route.post('/bets/editoption_autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, editAutoStackOptionPostController)
route.post('/bets/deleteoption_autostack/:slug', ...authetiCateMiddleware, loginAdminBinding, deleteAutoStackOptionPostController)
//match set router 


route.post('/bets/setmatch', ...authetiCateMiddleware, loginAdminBinding, setMatchPostController)
//edit match details
route.post('/bets/editmatch/:slug', ...authetiCateMiddleware, loginAdminBinding, editMatchPostController)
//set question
route.post('/bets/setquestion/:slug', ...authetiCateMiddleware, loginAdminBinding, addQuestionsPostController)
route.post('/bets/editquestion/:slug', ...authetiCateMiddleware, loginAdminBinding, editQuestionsPostController)
route.post('/bets/deletequestion/:slug', ...authetiCateMiddleware, loginAdminBinding, deleteQuestionsPostController)
route.post('/bets/showquestion/:slug', ...authetiCateMiddleware, loginAdminBinding, showQuestionsPostController)
route.post('/bets/hidequestion/:slug', ...authetiCateMiddleware, loginAdminBinding, hideQuestionsPostController)

//set options
route.post('/bets/setoption/:slug', ...authetiCateMiddleware, loginAdminBinding, addOptionPostController)
//edit options 
route.post('/bets/editoption/:slug', ...authetiCateMiddleware, loginAdminBinding, editOptionPostController)
route.post('/bets/deleteoption/:slug', ...authetiCateMiddleware, loginAdminBinding, deleteOptionPostController)
route.post('/bets/winoption/:slug', ...authetiCateMiddleware, loginAdminBinding, winPostController)

//

route.get('/bets/placebets', ...authetiCateMiddleware, loginAdminBinding, adminPlaceBetsGetController)
route.post('/bets/cancel_placebets/:slug', ...authetiCateMiddleware, loginAdminBinding, cancelBetPostController)

//games bets
route.post('/bets', ...authetiCateMiddleware, loginAdminBinding, adminBetsPostController)
route.get('/bets', ...authetiCateMiddleware, loginAdminBinding, adminBetsGetController);
route.get('/bets/single_element/:slug', ...authetiCateMiddleware, loginAdminBinding, adminBetsSingleElementController);

route.post('/bets/change_status/:slug', ...authetiCateMiddleware, loginAdminBinding, adminBetsChangeStatusPostController)
route.post('/bets/hidden/:slug', ...authetiCateMiddleware, loginAdminBinding, adminBetsHiddenPostController)
route.post('/bets/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminBetsDeletePostController)
route.post('/bets/finished/:slug', ...authetiCateMiddleware, loginAdminBinding, adminBetsFinishedPostController)
route.get('/bets/finished', ...authetiCateMiddleware, loginAdminBinding, adminFinishedItemGetController)


//upload images 
route.get('/uploads', imageUploadGetController)
route.post('/uploads', ...authetiCateMiddleware, loginAdminBinding, uploads.single('myImage'), imageUploadPostController)
route.delete('/uploads/:slug', ...authetiCateMiddleware, loginAdminBinding, imageUploadDeleteController)
route.post('/icon_uploads/:slug', ...authetiCateMiddleware, loginAdminBinding, titleIconPostController)


//admin deposit


route.get('/deposits', ...authetiCateMiddleware, loginAdminBinding, adminDepositGetController)
route.post('/deposits/accept/:slug', ...authetiCateMiddleware, loginAdminBinding, adminDepositPostController)
route.post('/deposits/reject/:slug', ...authetiCateMiddleware, loginAdminBinding, adminRejectedDepositPostController)
route.post('/deposits/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminDeletedDepositPostController)

//admin transfer
route.get('/transfers', ...authetiCateMiddleware, loginAdminBinding, adminTransferGetController)
route.post('/transfers/accept/:slug', ...authetiCateMiddleware, loginAdminBinding, adminTransferAcceptPostController)
route.post('/transfers/reject/:slug', ...authetiCateMiddleware, loginAdminBinding, adminRejectedTransferPostController)
route.post('/transfers/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminDeletedTransferPostController)


route.get('/withdraws', ...authetiCateMiddleware, loginAdminBinding, adminWithdrawGetController)
route.post('/withdraws/accept/:slug', ...authetiCateMiddleware, loginAdminBinding, adminWithdrawAcceptPostController)
route.post('/withdraws/reject/:slug', ...authetiCateMiddleware, loginAdminBinding, adminWithdrawRejectPostController)
route.post('/withdraws/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminWithdrawDeletePostController)


//account type set 
route.get('/account_type', ...authetiCateMiddleware, loginAdminBinding, adminAccountGetController)
route.post('/account_type', ...authetiCateMiddleware, loginAdminBinding, adminAccountPostController)
route.post('/account_type/edit/:slug', ...authetiCateMiddleware, loginAdminBinding, adminAccountEditPostController)
route.post('/account_type/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminAccountDeletePostController)
route.post('/account_type/changestatus/:slug', ...authetiCateMiddleware, loginAdminBinding, adminAccountStatusChangePostController)
// admin info changes 
route.get('/admindetails', ...authetiCateMiddleware, loginAdminBinding, adminDetailsGetController);
route.post('/delete/:slug', ...authetiCateMiddleware, loginAdminBinding, adminDeletePostController)
route.post('/change_active_status/:slug', ...authetiCateMiddleware, loginAdminBinding, adminActiveStatusPostController)
route.post('/edit_admin/:slug', ...authetiCateMiddleware, loginAdminBinding, adminEditPostController)


// user info 
route.post('/user/change_active_status/:slug', ...authetiCateMiddleware, loginAdminBinding, adminUserActiveStatusPostController)
route.post('/edit_user/:slug', ...authetiCateMiddleware, loginAdminBinding, adminEditUserInfoPostController);
route.get('/userdetails', ...authetiCateMiddleware, loginAdminBinding, adminUserListGetController);


//dashboard get controller 
route.get('/dashboard', ...authetiCateMiddleware, loginAdminBinding, adminDashboardGetController);
route.post('/general_settings', ...authetiCateMiddleware, loginAdminBinding, generalSettingsPostController);
route.get('/general_settings', generalSettingsGetController);

route.post('/color_settings', ...authetiCateMiddleware, loginAdminBinding, colorSettingsPostController);
route.get('/color_settings', colorSettingsGetController);


route.post('/slider_image/:slug', ...authetiCateMiddleware, loginAdminBinding, adminSliderPostController);
route.delete('/slider_image/:slug', ...authetiCateMiddleware, loginAdminBinding, adminSliderDeleteController);

//user visiting controller
route.get('/user/visit/:slug', ...authetiCateMiddleware, loginAdminBinding, userVisitingGetController);

//club visiting controller 
route.get('/club/visit/:slug', ...authetiCateMiddleware, loginAdminBinding, clubVisitingGetController);

// admin login route
route.get('/login', adminLoginGetController)
route.post('/login', adminLoginPostController)

route.get('/is_login', isAdminLoginGetController);

//admin signup route
route.get('/signup', ...authetiCateMiddleware, loginAdminBinding, adminSignupGetController)
route.post('/signup', ...authetiCateMiddleware, loginAdminBinding, adminSignupPostController)

//admin logout
route.post('/logout', ...authetiCateMiddleware, loginAdminBinding, adminLogoutController)




module.exports = route;