const Clubinfo =require('../../models/Clubinfo');
const User=require('../../models/User');
const GameBets=require('../../models/GameBets');
const PlaceBets=require('../../models/PlaceBets')
const dateformat =require('dateformat')


const clubMemberGetController=async(req,res,next)=>{
    try{
        let clubInfo=await Clubinfo.findById({'_id':req.club._id})
        let userList=await User.find({'_id':{$in:clubInfo.userlist}});
        return res.status(200).json({
            clubMember:arrayFilter(userList)
        })
    }
    catch(e){
        return res.status(400).json({
            flashMessage:'Something happend error please try again.'
        })
    }
}


const clubMemberDetailsGetController=async(req,res,next)=>{
    const userId=req.params.slug;

    try{
         const user=await User.findById(userId);
         let placeList=await PlaceBets.find({'_id':{$in:user.bets}}).limit(50).sort({'_id':-1});
         let gameList=await GameBets.find({'_id':{$in:user.games}}).limit(50).sort({'_id':-1});
    
         res.status(200).json({
             betlist:[...matchFilter(placeList),...gameFilter(gameList)].sort()
         })

    }
    catch(e){
        return res.status(400).json({
            flashMessage:'Something happend error please try again.'
        })
    }
}

const clubDashboardGetController=async(req,res,next)=>{

    try{
        let club=await Clubinfo.findById(req.club._id);
        return res.status(200).json({
            dashboard: {
                amount:club.amount,
                clubName:club.clubName,
                totalWithdraw:club.totalWithdraw,
                userlist:club.userlist
            }
        })
        

    }
    catch(e){
        return res.status(400).json({
            flashMessage:'Something happend error please try again.'
        })
    }
}

module.exports={clubMemberGetController,clubMemberDetailsGetController,clubDashboardGetController}



const arrayFilter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            
            col1:index+1,
            col2:item.name,
            col3:item.username,
            col4:item.email,
            col5:item.amount,
            col6:item._id,
            col7:dateformat(item.createdAt, "dd-mm-yy,h:MM TT"),
            col8:item.activeStatus
        }
    })
}


const matchFilter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.matchName,
            col3:item.questionName,
            col4:item.answer,
            col5:item.amount,
            col6:item.rate,
            col7:item.winStatus!=='Congratulations'? '0.00':item.possiblyWin,
            col8:parseFloat(item.amount,10)*2 /100,
            col9:dateformat(item.createdAt, "dd-mm-yy,h:MM TT"),
            col10:item.winStatus
        }
    })
}

const gameFilter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.gameName,
            col3:'--',
            col4:item.Stake,
            col5:item.amount,
            col6:item.returnRate,
            col7:item.winStatus!=='Congratulations'? '0.00':item.possiblyWin,
            col8:parseFloat(item.amount,10)*2 /100,
            col9:dateformat(item.createdAt, "dd-mm-yy,h:MM TT"),
            col10:item.winStatus
        }
    })
}