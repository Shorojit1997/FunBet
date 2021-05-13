const express = require('express');
const route=express.Router();
const {authenticateJWT,isUserAuthenticated} =require('../../middleware/authenticateCheacker')
const authetiCateMiddleware = [authenticateJWT,isUserAuthenticated]
const {loginUserbinding}=require('../../middleware/LoginUserBinding')
// local files 
const {signupGetController,
       signupPostController,
       loginGetController,
       loginPostController,
       logoutPostController
 } =require('../../controller/authController')


route.get('/user/signup',signupGetController)
route.post('/user/signup',signupPostController)


route.get('/user/login',loginGetController)
route.post('/user/login',loginPostController)

route.post('/user/logout',...authetiCateMiddleware,loginUserbinding,logoutPostController)

module.exports=route;