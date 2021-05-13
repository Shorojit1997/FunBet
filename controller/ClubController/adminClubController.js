
const Club=require('../../models/Clubinfo');
const dateformat =require('dateformat')


const adminClubGetController=async(req,res,next)=>{
    try{
        let clubList=await Club.find({});
        return res.status(200).json({
            clublist:clubFIlter(clubList)
        })

    }catch(e){
        return res.status(400).json({
            flashMessage:'Please try again'
        })
    }
}


module.exports={adminClubGetController}

const clubFIlter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.clubName,
            col3:item.name,
            col4:item.phone,
            col5:item._id,
            col6:item.email,
            col7:item.userlist.length,
            col8:item.amount,
            col9:dateformat(item.createdAt, "dd-mm-yy,h:MM TT"),
            col10:item.activeStatus

        }
    })
}