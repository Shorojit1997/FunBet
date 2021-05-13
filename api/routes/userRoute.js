//local files 
const { depositGetController, depositPostController } = require('../../controller/depositController')
const { withdrawGetController, withdrawPostController } = require('../../controller/withdrawController')
const { transferGetController, transferPostController } = require('../../controller/transferController')
const { signupGetController,
  signupPostController,
  editUserInfoPostController,
  loginGetController,
  loginPostController,
  logoutPostController
} = require('../../controller/authController')

const {userAccountGetController}= require('../../controller/userAccountController')

const {ludoUserGetController,ludoUserPostController,gameBetsGetController} =require('../../controller/ludoUserController')
const {userBetsGetController,userPlaceBetPostController,userPlaceBetGetController} =require('../../controller/userBetsController')
const {gameTypeGetController} =require('../../controller/userGameTypeController')
const { wheelUserGetController, wheelUserPostController } =require('../../controller/wheelUserController')
const { coinUserGetController, coinUserPostController }=require('../../controller/coinTossUserController')
const  { evenOddUserGetController, evenOddUserPostController }=require('../../controller/evenOddUserController')
const  { cardUserPostController, cardUserGetController }=require('../../controller/cardController')
const {cubListgetController}=require('../../controller/clubController')
const {getUserSlider}=require('../../controller/sliderController')
const{userNotificationsGetController} =require('../../controller/notificationsController')

// middle ware 
const {authenticateJWT,isUserAuthenticated} =require('../../middleware/authenticateCheacker')
const authetiCateMiddleware = [authenticateJWT,isUserAuthenticated]
const {loginUserbinding}=require('../../middleware/LoginUserBinding')

const route = require('express').Router();

// game type set route 
route.get('/games/game_type',loginUserbinding, gameTypeGetController)

//ludo user route 
route.get('/games/ludo', isUserAuthenticated,loginUserbinding,ludoUserGetController)
route.post('/games/ludo', isUserAuthenticated,loginUserbinding, ludoUserPostController)


//wheel user route 
route.get('/games/wheel',isUserAuthenticated,loginUserbinding,wheelUserGetController)
route.post('/games/wheel',isUserAuthenticated,loginUserbinding, wheelUserPostController)

//coin toss user route 
route.get('/games/coin', isUserAuthenticated,loginUserbinding,coinUserGetController)
route.post('/games/coin', isUserAuthenticated,loginUserbinding, coinUserPostController)

//even odd route 
route.get('/games/even_odd',isUserAuthenticated,loginUserbinding,evenOddUserGetController)
route.post('/games/even_odd',isUserAuthenticated,loginUserbinding,evenOddUserPostController)

//card route 
route.get('/games/card', isUserAuthenticated,loginUserbinding,cardUserGetController)
route.post('/games/card',isUserAuthenticated,loginUserbinding,cardUserPostController)


route.get('/games/gamebets', ...authetiCateMiddleware,loginUserbinding,gameBetsGetController)

//deposit routes
route.get('/deposits', ...authetiCateMiddleware,loginUserbinding, depositGetController)
route.post('/deposits', ...authetiCateMiddleware,loginUserbinding, depositPostController)

//withdraw routes
route.get('/withdraws', ...authetiCateMiddleware,loginUserbinding, withdrawGetController)
route.post('/withdraws', ...authetiCateMiddleware,loginUserbinding, withdrawPostController)

//transfer routes 
route.get('/transfers', ...authetiCateMiddleware,loginUserbinding, transferGetController)
route.post('/transfers', ...authetiCateMiddleware,loginUserbinding, transferPostController)

//account get controller
route.get('/account_name', userAccountGetController)

//bets 
route.get('/bets', userBetsGetController);
route.post('/place_bets', ...authetiCateMiddleware,loginUserbinding, userPlaceBetPostController)
route.get('/place_bets', ...authetiCateMiddleware,loginUserbinding, userPlaceBetGetController)

///slider 
route.get('/slider_image', getUserSlider)

//authenticationn

route.get('/signup', signupGetController)
route.post('/signup', signupPostController)

// edit information
route.post('/edit_info', ...authetiCateMiddleware,loginUserbinding, editUserInfoPostController)

route.get('/notifications',...authetiCateMiddleware,loginUserbinding,userNotificationsGetController)


route.get('/is_login', loginGetController)
route.post('/login', loginPostController)
route.get('/clublist',cubListgetController)


route.post('/logout', logoutPostController)




module.exports = route;

