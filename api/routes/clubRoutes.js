const route=require('express').Router();

const { loginClubBinding } = require('../../middleware/LoginUserBinding')
const { authenticateJWT, isClubAuthenticated } = require('../../middleware/authenticateCheacker')
const authetiCateMiddleware = [authenticateJWT, isClubAuthenticated]

const {signupPostController,loginPostController,loginGetController,logoutPostController} =require('../../controller/ClubController/clubAuthController');

const {clubMemberGetController,clubMemberDetailsGetController,clubDashboardGetController} =require('../../controller/ClubController/clubController')
const  { withdrawGetController, withdrawPostController }=require('../../controller/ClubController/withdrawController');
const { clubPostController, clubGetController }=require('../../controller/Message/ClubController');



route.get('/club_member',...authetiCateMiddleware,loginClubBinding,clubMemberGetController)
route.get('/club_member/:slug',...authetiCateMiddleware,loginClubBinding,clubMemberDetailsGetController)

route.get('/message/:slug',...authetiCateMiddleware,loginClubBinding,clubGetController)
route.post('/message',...authetiCateMiddleware,loginClubBinding,clubPostController)

//admin message 

route.get('/dashboard',...authetiCateMiddleware,loginClubBinding,clubDashboardGetController)

route.get('/withdraws',...authetiCateMiddleware,loginClubBinding,withdrawGetController)
route.post('/withdraws',...authetiCateMiddleware,loginClubBinding,withdrawPostController)




route.post('/signup',signupPostController)
route.post('/login',loginPostController)
route.get('/is_login',loginGetController)
route.post('/logout',logoutPostController)




module.exports=route;