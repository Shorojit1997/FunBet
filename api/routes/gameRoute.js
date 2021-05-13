
const route=require('express').Router();
// local files 

const {
    gameAdminGetController,
    ludoRatingSetPostController,
    ludoRatingSetGetController,
    ludoAdminPicPostController
}= require('../../controller/games/ludoController')
const  {
    wheelRatingSetGetController,
    wheelRatingSetPostController,
    wheelAdminPicPostController
} =require('../../controller/games/wheelController')

const {
    coinRatingSetGetController,
    coinRatingSetPostController,
    coinAdminPicPostController
}=require('../../controller/games/coinTossController')


const {
    evenOddRatingSetGetController,
    evenOddRatingSetPostController,
    evenOddAdminPicPostController
}=require('../../controller/games/evenOddController')

const {
    cardRatingSetGetController,
    cardRatingSetPostController,
    cardAdminPicPostController
}=require('../../controller/games/cardController')

const {
    addGameTypeGetController,
    addGameTypePostController,
    editGameTypePostController,
    deleteGameTypePostController
}=require('../../controller/adminController/adminGameTypeController');
const {
    addPromocodePostController,
    deletePromocodePostController,
    addPromocodeGetController
}=require('../../controller/adminController/adminPromocodeController')
const {
    adminNotificationsGetController,
    adminNotificationsPostController,
    adminNotificationsEditController,
    adminNotificationsDeleteController
}=require('../../controller/notificationsController')

const {adminClubGetController}=require('../../controller/ClubController/adminClubController');
const {getSendController,getReceiveController,clubPostController,DeleteMessageController} =require('../../controller/Message/AdminController')



const {loginAdminBinding}=require('../../middleware/LoginUserBinding')
const {authenticateJWT,isAdminAuthenticated} =require('../../middleware/authenticateCheacker')
const authetiCateMiddleware = [authenticateJWT,isAdminAuthenticated]
//club details


route.get('/club/clublist',...authetiCateMiddleware,loginAdminBinding,adminClubGetController)

//club message 

route.get('/club/receive_message',...authetiCateMiddleware,loginAdminBinding,getReceiveController);
route.get('/club/send_message',...authetiCateMiddleware,loginAdminBinding,getSendController)
route.post('/club/message/:slug',...authetiCateMiddleware,loginAdminBinding,clubPostController)
route.post('/club/message/delete/:slug',...authetiCateMiddleware,loginAdminBinding,DeleteMessageController)


//add game type

route.get('/games/game_type',...authetiCateMiddleware,loginAdminBinding,addGameTypeGetController)
route.post('/games/game_type',...authetiCateMiddleware,loginAdminBinding,addGameTypePostController)
route.post('/games/edit_game_type/:slug',...authetiCateMiddleware,loginAdminBinding,editGameTypePostController)
route.post('/games/delete_game_type/:slug',...authetiCateMiddleware,loginAdminBinding,deleteGameTypePostController)

route.post('/games/ludo',...authetiCateMiddleware,loginAdminBinding,ludoRatingSetPostController)
route.get('/games/ludo',...authetiCateMiddleware,loginAdminBinding,ludoRatingSetGetController)

route.get('/games/gamebets/:slug',...authetiCateMiddleware,loginAdminBinding,gameAdminGetController)// all games
route.post('/games/ludo/:slug',...authetiCateMiddleware,loginAdminBinding,ludoAdminPicPostController)//ludo  pic  settings

//wheel
route.post('/games/wheel',...authetiCateMiddleware,loginAdminBinding,wheelRatingSetPostController)
route.get('/games/wheel',...authetiCateMiddleware,loginAdminBinding,wheelRatingSetGetController)

//coin toss
route.post('/games/coin',...authetiCateMiddleware,loginAdminBinding,coinRatingSetPostController)
route.get('/games/coin',...authetiCateMiddleware,loginAdminBinding,coinRatingSetGetController)

//odd even toss
route.post('/games/even_odd',...authetiCateMiddleware,loginAdminBinding,evenOddRatingSetPostController)
route.get('/games/even_odd',...authetiCateMiddleware,loginAdminBinding,evenOddRatingSetGetController)

//card
route.post('/games/card',...authetiCateMiddleware,loginAdminBinding,cardRatingSetPostController)
route.get('/games/card',...authetiCateMiddleware,loginAdminBinding,cardRatingSetGetController)

//promocode
route.post('/security',...authetiCateMiddleware,loginAdminBinding,addPromocodePostController)
route.get('/security',...authetiCateMiddleware,loginAdminBinding,addPromocodeGetController)
route.delete('/security/:slug',...authetiCateMiddleware,loginAdminBinding,deletePromocodePostController)


route.post('/games/wheel/:slug',...authetiCateMiddleware,loginAdminBinding,wheelAdminPicPostController)
route.post('/games/coin/:slug',...authetiCateMiddleware,loginAdminBinding,coinAdminPicPostController)
route.post('/games/even_odd/:slug',...authetiCateMiddleware,loginAdminBinding,evenOddAdminPicPostController)
route.post('/games/card/:slug',...authetiCateMiddleware,loginAdminBinding,cardAdminPicPostController);


route.get('/notifications',...authetiCateMiddleware,loginAdminBinding,adminNotificationsGetController)
route.post('/notifications',...authetiCateMiddleware,loginAdminBinding,adminNotificationsPostController)
route.put('/notifications/:slug',...authetiCateMiddleware,loginAdminBinding,adminNotificationsEditController)
route.delete('/notifications/:slug',...authetiCateMiddleware,loginAdminBinding,adminNotificationsDeleteController)

module.exports=route;